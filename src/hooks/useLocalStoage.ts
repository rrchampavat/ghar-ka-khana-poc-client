/* eslint-disable no-console */
import { useState } from "react";

const useLocalStorage = (
  key: string,
  initialValue?: any
): [
  storedValue: any,
  setValue: (value: any) => void,
  removeValue: () => void
] => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error getting item from localStorage: ${error}`);
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      const valueToStore =
        typeof value === "function" ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setStoredValue(valueToStore);
    } catch (error) {
      console.error(`Error setting item in localStorage: ${error}`);
    }
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(undefined);
    } catch (error) {
      console.error(`Error removing item from localStorage: ${error}`);
    }
  };

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;
