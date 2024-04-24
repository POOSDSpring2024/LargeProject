import { CookieComponent } from '../auth/cookie-component';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopNavBar from '../components/navbar';

import MyListComponent from '../components/list-component';
import GetItems from '../components/get-items';
import LargestPortion from '../components/get-portion-info';
import GetPortions from '../components/get-portion-info';
import AddItemModal from '../components/add-item-modal';
import EditItemModal from '../components/edit-item-modal';
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
import GetLocations from '../components/get-locations';
import { set } from '@gluestack-style/react';

export default function Dashboard() {
  const [userId, setUserId] = useState(null);
  const [businessId, setBusinessId] = useState('');
  const [itemList, setItemList] = useState([]);
  const [currectItem, setCurrentItem] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const handleUserIdReceived = receivedUserId => {
    setUserId(receivedUserId);
  };

  const handleAccountPress = async () => {
    Alert.alert('Your Business ID is: ' + businessId);
  };
  const handleOpenModal = () => {
    setIsModalVisible(true); // Set modal visibility to true to display the modal
  };
  const handleCloseModal = () => {
    setIsModalVisible(false); // Set modal visibility to false to hide the modal
  };
  const handleOpenEditModal = () => {
    setIsEditModalVisible(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
  };

  const handleAddPress = newItem => {
    handleCloseModal();
  };
  const handleEditPress = newItem => {
    handleCloseModal();
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        'https://slicer-backend.vercel.app/api/auth/user/logout',
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
      'https://slicer-backend.vercel.app/api/auth/user/user-info?id=' + userId,
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
    //storeAccessToken(data[0]);
  }, [userId]);

  useEffect(() => {
    const fetchItemList = async () => {
      try {
        if (businessId) {
          const response = await fetch(
            `https://slicer-backend.vercel.app/api/crud/business/item-list/read-all/?businessId=${businessId}`,
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
        <Pressable style={styles.button} onPress={handleOpenModal}>
          <Ionicons name="add" size={34} color="white" />
        </Pressable>
      </View>
      {businessId && (
        <>
          <AddItemModal
            isVisible={isModalVisible}
            onClose={handleCloseModal}
            onAddItem={handleAddPress}
            businessId={businessId}
          />
          {/*<EditItemModal
            isVisible={isEditModalVisible}
            onClose={handleCloseEditModal}
            onAddItem={handleEditPress}
            businessId={businessId}
      />*/}

          <View style={{ flex: 1, paddingHorizontal: 8 }}>
            <MyListComponent
              data={itemList}
              onEditItemPress={handleOpenEditModal}
              businessId={businessId}
            />
          </View>
        </>
      )}
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
