import React, { useState } from 'react';
import { View, Modal, Text, TextInput, Button } from 'react-native';

const EditItemModal = ({ isVisible, onClose, onAddItem, businessId }) => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');

  const handleEditItem = () => {
    // Validate input fields

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
        <Button title="Save" onPress={handleEditItem} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default EditItemModal;
