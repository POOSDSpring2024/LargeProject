import React, { useState } from 'react';
import { Link, router } from 'expo-router';

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

export default function CreateBusiness() {
  const [businessName, setBusinessName] = useState('');

  const handleSubmit = async () => {
    try {
      console.log('business name:', businessName);

      const response = await fetch(
        'https://slicer-project-backend.vercel.app/api/auth/business/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ businessName })
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Business Id:', data.businessId);
        Alert.alert('Your Business ID is: ', data.businessId);
        router.push('./business-join');
      } else {
        const errorData = await response.json();
        Alert.alert('Creation Failed', errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while creating business.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Business Creation</Text>
      <View style={styles.subTitleContainer}>
        <Text style={styles.subTitle}>
          Enter business to create company account
        </Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Business Name"
          value={businessName}
          onChangeText={setBusinessName}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </View>
      <Link href="./business-join" asChild>
        <Pressable>
          <Text style={styles.link}>Already have a business? Join here</Text>
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
