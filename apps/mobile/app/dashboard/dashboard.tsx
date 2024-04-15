import { StyleSheet, Text, View, Button } from 'react-native';
import { Pressable } from '@gluestack-ui/themed';
import { Link } from 'expo-router';
import React from 'react';
import { Toggle } from '@ui-kitten/components';

export default function Dashboard() {
  return <View style={styles.container}></View>;
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
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  }
});
