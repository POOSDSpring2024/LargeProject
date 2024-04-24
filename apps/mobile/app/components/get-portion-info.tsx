import { get } from '@gluestack-style/react';
import React, { useState, useEffect } from 'react';

export default function GetPortions(businessId, itemName) {
  //const [itemList, setItemList] = useState([]);
  const requestBody = {
    itemName: itemName
  };

  const getPortionWithDelay = async (businessId, itemName, delay) => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const portions = await fetchPortionList();
          resolve(portions);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };

  const fetchPortionList = async () => {
    try {
      const response = await fetch(
        'https://slicer-backend.vercel.app/api/crud/business/portion-info-list/read-all?businessId=' +
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
        throw new Error('Failed to fetch portion info');
      }
      const data = await response.json();
      const fieldValues = data.outputList[0];
      return fieldValues;
      console.log('There should be some portion data here', fieldValues);
    } catch (error) {
      console.error('Error in fetchPortionList:', error);
    }
  };

  getPortionWithDelay(businessId, itemName, 1000);
}
