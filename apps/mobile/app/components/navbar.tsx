import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface TopNavBarProps {
  onLogout: () => void; // Function to handle logout action
  onAccountPress: () => void; // Function to handle account button press
}
const TopNavBar: React.FC<TopNavBarProps> = ({ onLogout, onAccountPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Slicer</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onAccountPress}>
          <MaterialCommunityIcons name="account" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onLogout}>
          <AntDesign name="logout" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1877F2',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  button: {
    marginLeft: 10,
    backgroundColor: '#054ead',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default TopNavBar;
