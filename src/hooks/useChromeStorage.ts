import { useCallback, useEffect, useState } from "preact/hooks";
import AreaName = chrome.storage.AreaName;
import StorageChange = chrome.storage.StorageChange;

const useChromeStorage = <T extends { [key: string]: any }>(
  namespace: AreaName,
  storageKey: string
): [T | undefined, (update: T) => void, boolean] => {
  const [isLoading, setIsLoading] = useState(true);
  const [storageValue, setStorageValue] = useState<T | undefined>(undefined);

  // Get the initial value
  useEffect(() => {
    chrome.storage[namespace].get(storageKey, initialValue => {
      setStorageValue(
        currentValue => (currentValue as T) ?? initialValue[storageKey]
      );
      setIsLoading(false);
    });
  }, [namespace, storageKey]);

  // Listen for changes
  useEffect(() => {
    const handler = (
      changes: { [key: string]: StorageChange },
      changeNameSpace: AreaName
    ) => {
      if (namespace !== changeNameSpace) return;
      if (!(storageKey in changes)) return;
      setStorageValue(changes[storageKey].newValue as T);
    };

    chrome.storage.onChanged.addListener(handler);
    return () => chrome.storage.onChanged.removeListener(handler);
  }, [namespace, storageKey]);

  // Apply changes
  const updateStorage = useCallback(
    (update: T) =>
      new Promise(resolve =>
        chrome.storage[namespace].set({ [storageKey]: update }, resolve)
      ),
    [namespace, storageKey]
  );

  return [storageValue, updateStorage, isLoading];
};

export default useChromeStorage;
