import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Button,
  Pressable,
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import EditItemModal from './edit-item-modal';
import GetLocations from './get-locations';
import { set } from '@gluestack-style/react';

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

const MyListComponent: React.FC<MyListComponentProps> = ({
  data,
  onEditItemPress,
  businessId
}) => {
  const [selectedItemName, setSelectedItemName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  //const [portionName, setPortionName] = useState('');
  //const [portionValue, setPortionValue] = useState('');
  const [locationName, setLocationName] = useState('');
  const handleEditPress = async itemName => {
    setSelectedItemName(itemName);
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const handleDeletePress = async itemName => {
    const firstRequestBody = {
      itemName: itemName
    };
    try {
      const response = await fetch(
        'https://slicer-backend.vercel.app/api/crud/business/item-location/read-all?businessId=' +
          businessId,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(firstRequestBody)
        }
      );
      if (!response.ok) {
        console.log('error yo');
        throw new Error('Failed to fetch location info');
      }
      const data = await response.json();
      const fieldValues = data.outputList[0];
      setLocationName(fieldValues.locationName[0]);
      console.log('Field Value', fieldValues);
    } catch (error) {
      console.error('Error in fetchPortionList:', error);
    }

    console.log('thelocatioName', locationName);
    const requestBody = {
      itemName: itemName
      //locationName: locationName
    };
    try {
      Alert.alert('Deleting Item:', itemName);
      const response = await fetch(
        'https://slicer-backend.vercel.app/api/crud/business/item-list/delete?businessId=' +
          businessId,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        }
      );
      console.log(requestBody);
      console.log('Response:', response);
      if (response.ok) {
        console.log(response);
        return locationName;
      }
    } catch (error) {
      console.error('Error in delete:', error);
    }
  };

  // Function to render each item
  const renderItem = ({ item }: { item: Item }) => (
    <View style={[styles.itemContainer, styles.itemBorder]}>
      <Text>{item.itemName}</Text>
      <View style={styles.buttons}>
        <Pressable
          style={styles.button}
          onPress={() => handleEditPress(item.itemName)}
        >
          <AntDesign name="edit" size={18} color="white" />
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => handleDeletePress(item.itemName)}
        >
          <AntDesign name="delete" size={18} color="white" />
        </Pressable>
      </View>
    </View>
  );

  return (
    <>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.itemName} // Use itemName as the unique key
      />
      <EditItemModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        itemName={selectedItemName}
        businessId={businessId}
      />
    </>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1, // Add border bottom
    borderBottomColor: 'lightgray' // Border color
  },
  itemBorder: {
    borderBottomWidth: 1, // Additional border bottom for each item
    borderBottomColor: 'lightgray' // Border color
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#1877F2',
    height: 30,
    width: 30,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
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
