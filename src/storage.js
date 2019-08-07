/* eslint-disable no-undef */
import {
  loadFromStorage,
  saveInStorage,
  hasItem,
  updateTtl
} from "./storageHelpers";

const initializeForStorage = storageFn => ({
  load: itemName => loadFromStorage({ storageFn, itemName }),
  set: (itemName, item, lifespan) =>
    saveInStorage({
      storageFn,
      itemName,
      item,
      lifespan
    }),
  setLifespan: (itemName, lifespan) =>
    updateTtl({ storageFn, itemName, lifespan }),
  has: itemName => hasItem({ storageFn, itemName })
});

export default () => ({
  local: initializeForStorage(() => localStorage),
  session: initializeForStorage(() => sessionStorage)
});
