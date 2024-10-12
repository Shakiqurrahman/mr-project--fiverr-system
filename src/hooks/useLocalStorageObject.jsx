import { useState, useEffect } from 'react';

export const useLocalStorageObject = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error getting item from local storage: ${error}`);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting item in local storage: ${error}`);
    }
  }, [key, storedValue]);

  const updateItem = (itemKey, value) => {
    setStoredValue(prevState => ({
      ...prevState,
      [itemKey]: value
    }));
  };

  return [storedValue, updateItem];
};
