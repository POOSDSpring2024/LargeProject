import React, { useState } from 'react';
import { View, Modal, Text, TextInput, Button } from 'react-native';

const AddItemModal = ({ isVisible, onClose, onAddItem }) => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');

  const handleAddItem = () => {
    // Validate input fields
    if (!itemName.trim()) {
      alert('Please enter item name');
      return;
    }

    // Add item to inventory
    onAddItem({ name: itemName.trim(), description: itemDescription.trim() });

    // Reset input fields and close modal
    setItemName('');
    setItemDescription('');
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
          placeholder="Description (optional)"
          value={itemDescription}
          onChangeText={setItemDescription}
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            padding: 10,
            marginVertical: 10,
            width: 250
          }}
        />
        <Button title="Save" onPress={handleAddItem} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default AddItemModal;
