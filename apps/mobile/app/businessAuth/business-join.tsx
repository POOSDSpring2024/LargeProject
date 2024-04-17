import React, { useState } from 'react';
import { Link, router } from 'expo-router';
import { CookieComponent } from '../auth/cookie-component';
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

export default function JoinBusiness() {
  const [userId, setUserId] = useState(null);
  const [businessId, setBusinessId] = useState('');

  const handleUserIdReceived = receivedUserId => {
    setUserId(receivedUserId);
  };

  const handleSubmit = async () => {
    try {
      console.log('User Id:', userId);
      console.log('Business Id', businessId);

      const response = await fetch(
        'https://slicer-backend.vercel.app/api/auth/business/add-connection',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId, businessId })
        }
      );

      if (response.ok) {
        const data = await response.json();
        router.push('../dashboard/dashboard');
      } else {
        const errorData = await response.json();
        Alert.alert('Failed to join business', errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while joining business.');
    }
  };

  return (
    <View style={styles.container}>
      <CookieComponent onUserIdReceived={handleUserIdReceived} />
      <Text style={styles.title}>Join Business</Text>
      <View style={styles.subTitleContainer}>
        <Text style={styles.subTitle}>
          Enter business ID to join the companies account
        </Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Business ID"
          secureTextEntry
          value={businessId}
          onChangeText={setBusinessId}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </View>
      <Link href="./business-create" asChild>
        <Pressable>
          <Text style={styles.link}>
            Don't have a business yet? Create one here
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
