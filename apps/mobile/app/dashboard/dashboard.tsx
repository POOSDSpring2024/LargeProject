import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';
import { Toggle } from '@ui-kitten/components';

export default function Dashboard() {
  const [checked, setChecked] = React.useState(false);

  const onCheckedChange = (isChecked): void => {
    setChecked(isChecked);
  };
  return (
    <View style={styles.container}>
      <Toggle checked={checked} onChange={onCheckedChange}>
        {`Checked: ${checked}`}
      </Toggle>
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
