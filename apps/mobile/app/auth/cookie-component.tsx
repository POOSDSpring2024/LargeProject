import React, { useState, useEffect } from 'react';
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function CookieComponent({ onUserIdReceived }) {
  const getAccessToken = async () => {
    try {
      const value = await AsyncStorage.getItem('accessToken');
      console.log('Access Token:', value);
      return value;
    } catch (error) {
      console.error('Error retrieving userId from AsyncStorage:', error);
      return null;
    }
  };

  const verifyAccessToken = async accessToken => {
    const response = await fetch(
      'http://localhost:3001/api/auth/' + accessToken,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    if (response.ok) {
      const responseData = await response.json();
      const { status, userId } = responseData;
      console.log('user:', userId);
      onUserIdReceived(userId);
      return { status, userId };
    } else {
      //nothing returned (wont happen with how api is setup but just in case)
      const errorData = await response.json();
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await getAccessToken();
      if (accessToken) {
        verifyAccessToken(accessToken).then(data => {
          console.log('Status:', data.status);
          console.log('User ID:', data.userId);
        });
      }
    };

    fetchData(); // Call fetchData function inside useEffect

    // Cleanup function (optional)
    return () => {
      // Cleanup code (if needed)
    };
  }, []); // Empty dependency array to run effect only once on mount

  return null;
}
