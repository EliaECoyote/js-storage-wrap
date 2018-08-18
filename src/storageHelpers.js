import {
  getObjectFromString,
  getTTL,
  isObject,
  isValidTTL,
  trackInfo
} from "./utils";

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
      trackInfo(`[load item] ttl expired for ${itemName}. Item removed`);
      return null;
    }
    return wrapper;
  } catch (err) {
    trackInfo(`[load item] error encountered while loading ${itemName}`, err);
    return null;
  }
};

export const saveInStorage = ({ storageFn, item, itemName, lifespan }) => {
  if (lifespan === 0) {
    trackInfo(
      `[save item] lifespan === 0 detected. Therefore not saving ${itemName}`
    );
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
    trackInfo(
      `[save item] error encountered while saving`,
      { itemName, item },
      err
    );
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
        trackInfo(
          "[update lifespan] ttl is already reached - cannot update ttl"
        );
        return false;
      }
    }
    trackInfo(
      "[update lifespan] item found did not previously had a ttl or has an incorrect format"
    );
  } catch (err) {
    trackInfo(
      "[update lifespan] error while updating lifespan",
      { itemName, lifespan },
      err
    );
  }
  return false;
};

export const hasItem = ({ storageFn, itemName }) =>
  loadFromStorage({ storageFn, itemName }) != null;
