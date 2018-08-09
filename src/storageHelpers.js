import {
  getObjectFromString, getTTL, isObject, isValidTTL,
} from './utils';

export const loadFromStorage = ({ storageFn, itemName }) => {
  try {
    const storage = storageFn();
    const rawItem = storage.getItem(itemName);
    if (rawItem == null) {
      return null;
    }
    if (isObject(rawItem)) {
      const wrapper = JSON.parse(rawItem);
      if (wrapper.ttl != null) {
        const item = wrapper.item && isObject(wrapper.item) ? JSON.parse(wrapper.item) : wrapper.item;
        return isValidTTL(rawItem.ttl) ? item : null;
      }
      return wrapper;
    }
    return rawItem;
  } catch (err) {
    console.warn(err);
    return null;
  }
};

export const saveInStorage = ({
  storageFn, item, itemName, lifespan,
}) => {
  if (lifespan === 0) { return false; }
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
    console.warn(err);
    return false;
  }
};

export const hasItem = ({ storageFn, itemName }) => {
  try {
    const storage = storageFn();
    const item = storage.loadItem(itemName);
    return item != null;
  } catch (err) {
    console.warn(err);
    return false;
  }
};