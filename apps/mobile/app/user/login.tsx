import React, { useState } from 'react';
import { Link } from 'expo-router';
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
  const handleLogin = async () => {
    try {
      const response = await fetch(
        'http://172.20.10.10:3001/api/auth/user/login',
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
        Alert.alert('Login Successful');

        // send user to dashboard page
        // Handle successful login (e.g., save token to AsyncStorage)
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
      <Link href="../" asChild>
        <Pressable>
          <Text style={styles.home}>Slicer</Text>
        </Pressable>
      </Link>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="USERNAME"
          value={username}
          onChangeText={setUsername}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="PASSWORD"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.buttonView}>
        <Link href="./dashboard" asChild>
          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </Link>
      </View>
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
    fontSize: 44,
    fontWeight: 'bold'
  },
  home: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#1877F2'
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
  }
});
