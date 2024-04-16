import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { CookieComponent } from '../auth/cookie-component';
import { Link, router } from 'expo-router';
import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [userId, setUserId] = useState(null);
  const handleUserIdChange = userId => {
    setUserId(userId);
  };
  const handleLogout = async () => {
    try {
      const response = await fetch(
        'http://localhost:3001/api/auth/user/logout',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        // Clear the cookie upon successful logout
        //document.cookie = ('accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'); // Change yourCookieName to the name of your cookie
        // Redirect to login page or any other appropriate page after successful logout
        router.replace('/user/login'); // Adjust the path to your login page
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error occurred while logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <CookieComponent />
      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
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
    fontWeight: 'bold',
    padding: 30
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
  }
});
