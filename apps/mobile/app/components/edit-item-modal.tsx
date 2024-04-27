import React, { useState, useEffect } from 'react';
import { View, Modal, Text, TextInput, Button } from 'react-native';

const EditItemModal = ({
  isVisible,
  onClose,
  businessId,
  itemName,
  fetchNewItemList
}) => {
  const [newItemName, setNewItemName] = useState('');
  //const [oldItemName, setOldItemName] = useState('');
  const [locationName, setLocationName] = useState('');
  const [portionName, setPortionName] = useState('');
  const [portionValue, setPortionValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (isVisible && itemName) {
        await fetchPortionList();
        await fetchLocationList();
      }
    };
    fetchData();
  }, [isVisible, itemName]);

  const fetchPortionList = async () => {
    const requestBody = {
      itemName: itemName
    };
    try {
      const response = await fetch(
        'https://slicer-project-backend.vercel.app/api/crud/business/portion-info-list/read-all?businessId=' +
          businessId,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.outputList == null) {
          return;
        } else {
          const fieldValues = data.outputList[0];
          console.log('There should be some portion data here', fieldValues);
          setPortionName(fieldValues.unitName);
          setPortionValue(fieldValues.unitNumber);
          return fieldValues;
        }
      }
    } catch (error) {
      console.error('Error in fetchPortionList:', error);
    }
  };
  const fetchLocationList = async () => {
    try {
      const response = await fetch(
        'https://slicer-project-backend.vercel.app/api/crud//business/item-location/read-one?businessId=' +
          businessId,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ itemName: itemName })
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.outputList == null) {
          return;
        } else {
          const fieldValues = data.outputList[0];
          console.log(fieldValues);
          setLocationName(fieldValues.locationName);
          return fieldValues;
        }
      }
    } catch (error) {
      console.error('Error in fetchPortionList:', error);
    }
  };

  const handleEditItem = async () => {
    const requestBody = {
      itemName: itemName,
      newItemName: setNewItemName
    };
    try {
      const response = await fetch(
        'https://slicer-project-backend.vercel.app/api/crud/business/item-list/update-name?businessId=' +
          businessId,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        }
      );
      if (response.ok) {
        await fetchNewItemList();
        console.log('Update successful');
      }
    } catch (error) {
      console.error('Error in update item:', error);
    }

    // Add item to inventory

    // Reset input fields and close modal
    setNewItemName('');
    setLocationName('');
    setPortionName('');
    setPortionValue('');
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Edit Item</Text>
        <TextInput
          placeholder="Item Name"
          value={itemName}
          onChangeText={setNewItemName}
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            padding: 10,
            marginVertical: 10,
            width: 250
          }}
        />
        <TextInput
          placeholder="Location"
          value={locationName}
          onChangeText={setLocationName}
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            padding: 10,
            marginVertical: 10,
            width: 250
          }}
        />
        <TextInput
          placeholder="Unit"
          value={portionName}
          onChangeText={setPortionName}
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            padding: 10,
            marginVertical: 10,
            width: 250
          }}
        />
        <TextInput
          placeholder="Unit Amount"
          value={portionValue}
          onChangeText={setPortionValue}
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            padding: 10,
            marginVertical: 10,
            width: 250
          }}
        />
        <Button title="Save" onPress={handleEditItem} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default EditItemModal;
