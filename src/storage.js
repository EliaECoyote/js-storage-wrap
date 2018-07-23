import { loadFromStorage, saveInStorage } from './storageHelpers';

const initializeForStorage = storage => ({
  load: itemName => loadFromStorage({ storage, itemName }),
  set: (itemName, item, lifespan) => saveInStorage({ storage, itemName, item, lifespan }),
  hasItem: itemName => hasItem(storage, itemName)
});

const hasStorage = () => {
  try {
    const mod = 'mod';
    localStorage.setItem(mod, mod);
    localStorage.removeItem(mod);
    return true;
  } catch(e) {
    return false;
  }
};
export class StorageWrapper {
  local;
  session;

  constructor() {
    if (hasStorage) {
      console.error('window object not available. cannot set storage items');
    } else {
      this.local = initializeForStorage(localStorage);
      this.session = initializeForStorage(sessionStorage);
      console.warn('storage wrapper initialized.');
    }
  }
}
