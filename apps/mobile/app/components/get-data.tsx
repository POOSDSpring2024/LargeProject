import React, { useState, useEffect } from 'react';
import ItemList from './get-items';
import GetLocations from './get-locations';
import GetPortions from './get-portion-info';

const GetItems = ({ businessId }) => {
  const [itemList, setItemList] = useState([]);
  const [currectItem, setCurrentItem] = useState(' ');

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

  useEffect(() => {
    if (itemList.length === 0) return;
    const combineData = async () => {
      for (let i = 0; i < itemList.length; i++) {
        setCurrentItem(itemList[i]);
      }
    };
    combineData();
  }, [itemList]);

  useEffect(() => {
    if (!currectItem) return;
    const fetchPortion = async () => {
      try {
        if (businessId) {
          const data = await GetPortions(businessId, currectItem.itemName);
          console.log('Portion Data:', data);
        }
      } catch (error) {
        console.error('Error fetching Data:', error);
      }
    };
    fetchPortion();
  }, [currectItem]);

  useEffect(() => {
    if (!currectItem) return;
    const fetchLocation = async () => {
      try {
        if (businessId) {
          const data = await GetLocations(businessId, currectItem.itemName);
          console.log('Location Data:', data);
        }
      } catch (error) {
        console.error('Error fetching Data:', error);
      }
    };
    fetchLocation();
  }, [currectItem]);
};

export default GetItems;
/*import { Link, router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import ItemList from './get-items';
import GetLocations from './get-locations';
import GetPortions from './get-portion-info';

export default function GetItems(businessId) {
  const [itemList, setItemList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [portionList, setPortionList] = useState([]);

  const newItem = {
    itemName: String,
    portionInfoList: [],
    //usedInList: [],
    //itemNeededList: [],
    locationItemList: []
    //locationItemLog: [],
    //distributorItemList: []
  };
  const data = [newItem];
  function creatItem(
    itemName,
    portionInfoList,
    //usedInList,
    //itemNeededList,
    locationItemList,
    locationItemLog
    //distributorItemList
  ) {
    newItem.itemName = itemName;
    newItem.portionInfoList = portionInfoList;
    //newItem.usedInList = usedInList;
    //newItem.itemNeededList = itemNeededList;
    newItem.locationItemList = locationItemList;
    //newItem.locationItemLog = locationItemLog;
    //newItem.distributorItemList = distributorItemList;
    return newItem;
  }
  addData();
  async function addData() {
    console.log('Item List length :', itemList.length);
    await fetchItemList();
    console.log('Item List length :', itemList.length);
    for (let i = 0; i < itemList.length; i++) {
      console.log('Item:', itemList[i]);
    }
  }

  async function fetchItemList() {
    try {
      if (businessId) {
        const itemList = await ItemList(businessId);
        setItemList(itemList);
      }
    } catch (error) {
      console.error('Error in fetchItemList:', error);
    }
  }
  async function fetchItemLocationList(itemName) {
    if (itemName) {
      const locationList = await GetLocations(businessId, itemName);
      setLocationList(locationList);
    }
  }
  async function fetchItemPortionList(itemName) {
    if (itemName) {
      const portionList = await GetPortions(businessId, itemName);
      setPortionList(locationList);
    }
  }
}
*/
