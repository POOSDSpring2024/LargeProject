import React, { useState, useEffect } from 'react';

export default function GetLocations(businessId, itemName) {
  //const [itemList, setItemList] = useState([]);
  const requestBody = {
    itemName: itemName
  };
  const fetchLocationList = async () => {
    try {
      const response = await fetch(
        'https://slicer-backend.vercel.app/api/crud/business/item-location/read-all?businessId=' +
          businessId,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        }
      );
      if (!response.ok) {
        console.log('error yo');
        throw new Error('Failed to fetch location info');
      }
      const data = await response.json();
      const fieldValues = data.outputList[0];
      return fieldValues;
      console.log('There should be some location data here', fieldValues);
    } catch (error) {
      console.error('Error in fetchPortionList:', error);
    }
  };
  fetchLocationList();
}
