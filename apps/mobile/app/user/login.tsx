import React, { useState } from 'react';
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Button,
  Image,
  Pressable,
  SafeAreaView,
  Switch,
  TextInput
} from 'react-native';

export default function Login() {
  const [click, setClick] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const storeAccessToken = async (accessToken, expires) => {
    try {
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('tokenExpires', expires.toISOString());
    } catch (error) {
      console.error('Error storing access token:', error);
    }
  };
  const handleLogin = async () => {
    try {
      console.log('username:', username);
      console.log('password', password);

      const response = await fetch(
        'http://localhost:3001/api/auth/user/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        }
      );

      if (response.ok) {
        const data = await response.json();
        //Alert.alert('Login Successful');
        const { accessToken, businessIdList } = data;

        // Fix authentication
        const expires = new Date();
        expires.setTime(expires.getTime() + 3 * 24 * 60 * 60 * 1000);
        storeAccessToken(accessToken, expires);
        if (businessIdList.length > 0) {
          router.push('../dashboard/dashboard');
        } else {
          router.push('../businessAuth/business-join');
        }
      } else {
        const errorData = await response.json();
        Alert.alert('Login Failed', errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while logging in.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.subTitleContainer}>
        <Text style={styles.subTitle}>
          Enter username and password to access acount
        </Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
      <Link href="./forgot-password" asChild>
        <Pressable>
          <Text style={styles.link}>Forgot Password</Text>
        </Pressable>
      </Link>
      <Link href="./sign-up" asChild>
        <Pressable>
          <Text style={styles.link}>
            Don't have an account? Create one here
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#1877F2'
  },
  subTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    padding: 10
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },
  inputView: {
    gap: 15,
    width: '100%',
    paddingHorizontal: 40,
    marginBottom: 5
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: '#1877F2',
    borderWidth: 1,
    borderRadius: 7
  },
  button: {
    backgroundColor: '#1877F2',
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonView: {
    width: '100%',
    paddingHorizontal: 50
  },
  optionsText: {
    textAlign: 'center',
    paddingVertical: 10,
    color: 'gray',
    fontSize: 13,
    marginBottom: 6
  },
  link: {
    fontSize: 14,
    color: '#1877F2',
    padding: 10
  }
});
