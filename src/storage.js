import { loadFromStorage, saveInStorage } from './storageHelpers';

const initializeForStorage = storage => ({
  load: itemName => loadFromStorage({ storage, itemName }),
  set: (itemName, item, lifespan) => saveInStorage({ storage, itemName, item, lifespan }),
  hasItem: itemName => hasItem(storage, itemName)
});

export class StorageWrapper {
  local;
  session;

  constructor() {
    if (typeof window === 'undefined') {
      console.error('window object not available. cannot set storage items');
    } else {
      this.local = initializeForStorage(localStorage);
      this.session = initializeForStorage(sessionStorage);
      console.warn('storage wrapper initialized.');
    }
  }
}
