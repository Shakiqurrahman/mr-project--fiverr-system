import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useLocalStorageObject = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      toast.error("Something went wrong!");
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }, [key, storedValue]);

  const updateItem = (itemKey, value) => {
    setStoredValue((prevState) => ({
      ...prevState,
      [itemKey]: value,
    }));
  };

  return [storedValue, updateItem];
};
