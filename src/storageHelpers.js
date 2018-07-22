export const loadFromStorage = ({ storage, itemName }) => {
  try {
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
    console.error(err);
    return null;
  }
};

export const saveInStorage = ({ storage, item, itemName, lifespan }) => {
  if (lifespan === 0) { return; }
  try {
    if (lifespan == null) {
      storage.setItem(itemName, isObject(item) ? JSON.stringify(item) : item);
    } else {
      const ttl = getTTL(lifespan);
      const wrapper = { ttl, item };
      storage.setItem(itemName, JSON.stringify(wrapper));
    }
  } catch (err) {
    console.error(err);
  }
};

export const hasItem = ({ storage, itemName }) => {
  const item = storage.loadItem(itemName);
  return item != null;
}