import React, { useState, useEffect } from 'react';

export default function ItemList(businessId) {
  //const [itemList, setItemList] = useState([]);
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
        console.log('Item List:', fieldValues);
        return fieldValues;
      }
    } catch (error) {
      console.error('Error in fetchItemList:', error);
    }
  };
  return fetchItemList();
}
/*
export default function GetItems(businessId) {
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
          console.log('Item List:', fieldValues); // Check itemList
          return fieldValues;
          //console.log('Item List:', fieldValues); // Check itemList
        }
      } catch (error) {
        console.error('Error in fetchItemList:', error);
      }
    };

    fetchItemList();
  }, [businessId]);
}*/
