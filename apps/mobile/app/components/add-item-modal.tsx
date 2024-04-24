import React, { useState } from 'react';
import { View, Modal, Text, TextInput, Button } from 'react-native';

const AddItemModal = ({ isVisible, onClose, onAddItem, businessId }) => {
  const [itemName, setItemName] = useState('');
  const [locationName, setLocationName] = useState('');
  const [portionName, setPortionName] = useState('');
  const [portionValue, setPortionValue] = useState('');

  const handleAddItem = async () => {
    const requestBody = {
      itemName: itemName
    };
    console.log('Request Body:', requestBody);
    try {
      const response = await fetch(
        'https://slicer-project-backend.vercel.app/api/crud/business/item-list/create?businessId=' +
          businessId,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        }
      );
      console.log('BusinessID', businessId);
      if (response.ok) {
        console.log(response);
      }
    } catch (error) {
      console.error('Error in fetchPortionList:', error);
    }

    // Add item to inventory
    onAddItem({
      name: itemName.trim(),
      location: locationName.trim(),
      portionName: portionName.trim(),
      portionValue: portionValue.trim()
    });

    // Reset input fields and close modal
    setItemName('');
    setLocationName('');
    setPortionName('');
    setPortionValue('');
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Add New Item</Text>
        <TextInput
          placeholder="Item Name"
          value={itemName}
          onChangeText={setItemName}
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
        <Button title="Add" onPress={handleAddItem} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default AddItemModal;
