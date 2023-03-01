import { useState } from "react";
import storage from "./storage";

const useStorage = <T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] => {
  const [storeValue, setStoreValue] = useState<T>(() => {
    return storage.get(key, defaultValue);
  });

  const _setStoreValue = (value: T) => {
    storage.set(key, value);
    setStoreValue(value);
  };

  // @ts-ignore
  return [storeValue, _setStoreValue];
};

export default useStorage;
