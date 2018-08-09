<<<<<<< HEAD
import {
  getObjectFromString, getTTL, isObject, isValidTTL,
} from './utils';
=======
import {getObjectFromString, getTTL, isObject, isValidTTL} from "./utils";
>>>>>>> master

export const loadFromStorage = ({ storageFn, itemName }) => {
  try {
    const storage = storageFn();
    const rawItem = storage.getItem(itemName);
    if (rawItem == null) {
      return null;
    }
    const wrapper = getObjectFromString(rawItem);
    if (wrapper != null) {
      if (wrapper.ttl != null) {
        const item = wrapper.item ? getObjectFromString(wrapper.item) : wrapper.item;
        const resolvedItem = item || wrapper.item;
        return isValidTTL(rawItem.ttl) ? resolvedItem : null;
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
<<<<<<< HEAD
};
=======
}
>>>>>>> master
