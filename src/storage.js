/* eslint-disable no-undef */
import { loadFromStorage, saveInStorage, hasItem } from "./storageHelpers";

const initializeForStorage = storageFn => ({
  load: itemName => loadFromStorage({ storageFn, itemName }),
  set: (itemName, item, lifespan) =>
    saveInStorage({
      storageFn,
      itemName,
      item,
      lifespan
    }),
  has: itemName => hasItem({ storageFn, itemName })
});

export default class StorageWrapper {
  constructor() {
    this.local = initializeForStorage(() => localStorage);
    this.session = initializeForStorage(() => sessionStorage);
  }
}
