import React, { useState } from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Button,
  Pressable,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import EditItemModal from './edit-item-modal';
import GetLocations from './get-locations';

//const [portionName, setPortionName] = useState('');
//const [portionValue, setPortionValue] = useState('');
//const [locationName, setLocationName] = useState('');

// Define the interface for each item in the data array
interface Item {
  itemName: string;
}

// Define the props interface for MyListComponent
interface MyListComponentProps {
  data: Item[]; // Array of items with 'itemName' property
}

const MyListComponent: React.FC<MyListComponentProps> = ({ data }) => {
  //const [portionName, setPortionName] = useState('');
  //const [portionValue, setPortionValue] = useState('');
  //const [locationName, setLocationName] = useState('');
  const handleEditPress = async itemName => {
    //setLocationName();
    //await GetLocations(data.businessId, data.itemList.itemName)
    console.log('Edit Item:', itemName);
    // Open the edit item modal
    //return(
    //<EditItemModal isVisible={isModalVisible} onClose={handleCloseModal} onAddItem={handleEditPress} />
    //)
  };
  // Function to render each item
  const renderItem = ({ item }: { item: Item }) => (
    <View style={[styles.itemContainer, styles.itemBorder]}>
      <Text>{item.itemName}</Text>
      <View>
        <Pressable
          style={styles.button}
          onPress={() => handleEditPress(item.itemName)}
        >
          <AntDesign name="edit" size={18} color="white" />
        </Pressable>
      </View>
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
  },
  button: {
    backgroundColor: '#1877F2',
    height: 30,
    width: 30,
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
    paddingTop: 10,
    paddingHorizontal: 140
  }
});
export default MyListComponent;
