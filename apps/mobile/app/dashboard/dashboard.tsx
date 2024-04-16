import { CookieComponent } from '../auth/cookie-component';
import { Link, router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopNavBar from '../components/navbar';
import AddItemModal from '../components/add-item-modal';
import MyListComponent from '../components/list-component';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  SectionList,
  Alert,
  Button,
  Image,
  Pressable,
  SafeAreaView,
  Switch,
  TextInput
} from 'react-native';

export default function Dashboard() {
  const [userId, setUserId] = useState(null);
  const [businessId, setBusinessId] = useState('');
  const [itemList, setItemList] = useState([]);
  //const [locationList, setLocationList] = useState([]);
  //const [locationMetaData, setLocationMetaData] = useState({});
  //const [itemLog, setItemLog] = useState([]);
  //const [openIndex, setOpenIndex] = useState(null);
  //const [popupLocation, setPopupLocation] = useState('');
  //const [popupItemLog, setPopupItemLog] = useState(false);
  //const [selectedItemName, setSelectedItemName] = useState('');
  //const [itemCountMap, setItemCountMap] = useState({});
  //const [locationInventory, setLocationInventory] = useState({});

  const handleUserIdReceived = receivedUserId => {
    setUserId(receivedUserId);
  };

  const handleAccountPress = async () => {
    Alert.alert('Your Business ID is: ' + businessId);
  };

  const handleAddPress = () => {};

  const handleLogout = async () => {
    try {
      const response = await fetch(
        'http://localhost:3001/api/auth/user/logout',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        const keysToRemove = ['accessToken', 'tokenExpires'];
        await AsyncStorage.multiRemove(keysToRemove);
        router.replace('/user/login'); // Adjust the path to your login page
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error occurred while logging out:', error);
    }
  };

  const getBusinessIdList = async () => {
    const response = await fetch(
      'http://localhost:3001/api/auth/user/user-info?id=' + userId,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    if (response.ok) {
      const responseData = await response.json();
      return responseData.businessIdList;
    } else {
      console.log('error');
      const errorData = await response.json();
      return [];
    }
  };

  useEffect(() => {
    const fetchBusinessId = async () => {
      try {
        const data = await getBusinessIdList();
        setBusinessId(data[0]);
      } catch (error) {
        console.error('Error fetching business ID list:', error);
      }
    };

    fetchBusinessId();
  }, [userId]);

  useEffect(() => {
    const fetchItemList = async () => {
      try {
        if (businessId) {
          const response = await fetch(
            `http://localhost:3001/api/crud/business/item-list/read-all/?businessId=${businessId}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
          if (!response.ok) {
            throw new Error('Failed to fetch item names');
          }
          const data = await response.json();
          const fieldValues = data.output || [];
          setItemList(fieldValues);
          console.log('Item List:', fieldValues); // Check itemList
        }
      } catch (error) {
        console.error('Error in fetchItemList:', error);
      }
    };

    fetchItemList();
  }, [businessId]);

  return (
    <View style={styles.container}>
      <CookieComponent onUserIdReceived={handleUserIdReceived} />
      <TopNavBar onLogout={handleLogout} onAccountPress={handleAccountPress} />
      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={handleAddPress}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 8 }}>
        <MyListComponent data={itemList} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    padding: 30
  },
  button: {
    backgroundColor: '#1877F2',
    height: 40,
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
