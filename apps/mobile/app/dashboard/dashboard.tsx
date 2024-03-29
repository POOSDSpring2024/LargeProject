import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Pressable style={styles.button} onPress={() => console.log('Pressed')}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
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
