'use strict';

var loadFromStorage = function loadFromStorage(_ref) {
  var storageFn = _ref.storageFn,
      itemName = _ref.itemName;

  try {
    var storage = storageFn();
    var rawItem = storage.getItem(itemName);
    if (rawItem == null) {
      return null;
    }
    if (isObject(rawItem)) {
      var wrapper = JSON.parse(rawItem);
      if (wrapper.ttl != null) {
        var item = wrapper.item && isObject(wrapper.item) ? JSON.parse(wrapper.item) : wrapper.item;
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

var saveInStorage = function saveInStorage(_ref2) {
  var storageFn = _ref2.storageFn,
      item = _ref2.item,
      itemName = _ref2.itemName,
      lifespan = _ref2.lifespan;

  if (lifespan === 0) {
    return;
  }
  try {
    var storage = storageFn();
    if (lifespan == null) {
      storage.setItem(itemName, isObject(item) ? JSON.stringify(item) : item);
    } else {
      var ttl = getTTL(lifespan);
      var wrapper = { ttl: ttl, item: item };
      storage.setItem(itemName, JSON.stringify(wrapper));
    }
    return true;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

var hasItem = function hasItem(_ref3) {
  var storageFn = _ref3.storageFn,
      itemName = _ref3.itemName;

  try {
    var storage = storageFn();
    var item = storage.loadItem(itemName);
    return item != null;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var initializeForStorage = function initializeForStorage(storageFn) {
  return {
    load: function load(itemName) {
      return loadFromStorage({ storageFn: storageFn, itemName: itemName });
    },
    set: function set$$1(itemName, item, lifespan) {
      return saveInStorage({ storageFn: storageFn, itemName: itemName, item: item, lifespan: lifespan });
    },
    has: function has(itemName) {
      return hasItem(storageFn, itemName);
    }
  };
};

var StorageWrapper = function StorageWrapper() {
  classCallCheck(this, StorageWrapper);

  this.local = initializeForStorage(function () {
    return localStorage;
  });
  this.session = initializeForStorage(function () {
    return sessionStorage;
  });
};

var storage = new StorageWrapper();

module.exports = storage;
