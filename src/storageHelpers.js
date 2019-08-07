import { getObjectFromString, getTTL, isObject, isValidTTL } from "./utils";

export const loadFromStorage = ({ storageFn, itemName }) => {
  try {
    const storage = storageFn();
    const rawItem = storage.getItem(itemName);
    if (rawItem == null) {
      return null;
    }
    const wrapper = getObjectFromString(rawItem);
    if (wrapper == null) {
      return rawItem;
    }
    if (wrapper.ttl != null) {
      if (isValidTTL(wrapper.ttl)) {
        return wrapper.item;
      }
      storage.removeItem(itemName);
      return null;
    }
    return wrapper;
  } catch (err) {
    return null;
  }
};

export const saveInStorage = ({ storageFn, item, itemName, lifespan }) => {
  if (lifespan === 0) {
    return false;
  }
  try {
    const storage = storageFn();
    if (lifespan == null) {
      storage.setItem(itemName, isObject(item) ? JSON.stringify(item) : item);
    } else {
      const ttl = getTTL(lifespan);
      const wrapper = { ttl, item };
      storage.setItem(itemName, JSON.stringify(wrapper));
    }
    return true;
  } catch (err) {
    return false;
  }
};

export const updateTtl = ({ storageFn, itemName, lifespan }) => {
  try {
    const storage = storageFn();
    const rawItem = storage.getItem(itemName);
    if (rawItem && lifespan && lifespan !== 0) {
      const wrapper = getObjectFromString(rawItem);
      if (wrapper && wrapper.ttl != null) {
        if (isValidTTL(wrapper.ttl)) {
          saveInStorage({ storageFn, item: wrapper.item, itemName, lifespan });
          return true;
        }
        return false;
      }
    }
  } catch (err) {
    // continue regardless of error
  }
  return false;
};

export const hasItem = ({ storageFn, itemName }) =>
  loadFromStorage({ storageFn, itemName }) != null;
