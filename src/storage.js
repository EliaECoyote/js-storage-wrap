import { loadFromStorage, saveInStorage, hasItem } from './storageHelpers';

const initializeForStorage = storageFn => ({
  load: itemName => loadFromStorage({ storageFn, itemName }),
  set: (itemName, item, lifespan) => saveInStorage({ storageFn, itemName, item, lifespan }),
  has: itemName => hasItem(storageFn, itemName)
});

export class StorageWrapper {
  local;
  session;

  constructor() {
    this.local = initializeForStorage(() => localStorage);
    this.session = initializeForStorage(() => sessionStorage);
  }
}
