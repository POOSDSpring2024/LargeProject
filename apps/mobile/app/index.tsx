import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Slicer</Text>
        <Link style={styles.link} href="./user/login" asChild>
          <Pressable>
            <Text style={styles.subtitle}>Login</Text>
          </Pressable>
        </Link>
        <Link style={styles.link} href="./dashboard/dashboard" asChild>
          <Pressable>
            <Text style={styles.subtitle}>Sign Up</Text>
          </Pressable>
        </Link>
        <Text style={styles.subtitle}></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 960,
    marginHorizontal: 'auto'
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 36,
    color: '#1877F2'
  },
  link: {
    fontSize: 60,
    fontWeight: 'bold'
  }
});
