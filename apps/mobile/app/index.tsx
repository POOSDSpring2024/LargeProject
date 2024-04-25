import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { registerRootComponent } from 'expo';
import { Link, useRouter } from 'expo-router';

function Page() {
  //const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Slicer</Text>
        <Text style={styles.subtitle}>A simple inventory manager</Text>
        <Link href="./user/sign-up" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </Pressable>
        </Link>
        <Link style={styles.link} href="./user/login" asChild>
          <Pressable>
            <Text style={styles.subtitle}>Have an Account? Login here</Text>
          </Pressable>
        </Link>
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black'
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white'
  },
  title: {
    justifyContent: 'center',
    padding: 50,
    paddingBottom: 10,
    alignItems: 'center',
    fontSize: 64,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 24,
    color: '#1877F2',
    paddingBottom: 30
  },
  link: {
    fontSize: 60,
    fontWeight: 'bold',
    paddingTop: 20
  }
});

export default registerRootComponent(Page);
