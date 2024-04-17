import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

// Define the interface for each item in the data array
interface Item {
  itemName: string;
}

// Define the props interface for MyListComponent
interface MyListComponentProps {
  data: Item[]; // Array of items with 'itemName' property
}

const MyListComponent: React.FC<MyListComponentProps> = ({ data }) => {
  // Function to render each item
  const renderItem = ({ item }: { item: Item }) => (
    <View style={[styles.itemContainer, styles.itemBorder]}>
      <Text>{item.itemName}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.itemName} // Use itemName as the unique key
    />
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1, // Add border bottom
    borderBottomColor: 'lightgray' // Border color
  },
  itemBorder: {
    borderBottomWidth: 1, // Additional border bottom for each item
    borderBottomColor: 'lightgray' // Border color
  }
});
export default MyListComponent;
