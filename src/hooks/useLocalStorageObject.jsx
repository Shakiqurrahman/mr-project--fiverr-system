import { useState, useEffect } from 'react';

/**
 * A custom hook to manage local storage as a single object.
 * @param {string} key - The key for local storage.
 * @param {object} initialValue - The initial value to use if the key doesn't exist.
 * @returns {[object, function]} - The current object and a function to update it.
 */
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
