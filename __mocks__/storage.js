function StorageMock() {
  let store = {};
  return {
    clear() {
      store = {};
    },
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    }
  };
}

export default StorageMock;
