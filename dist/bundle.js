'use strict';

var loadFromStorage = function loadFromStorage(_ref) {
  var storage = _ref.storage,
      itemName = _ref.itemName;

  try {
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
    console.error(err);
    return null;
  }
};

var saveInStorage = function saveInStorage(_ref2) {
  var storage = _ref2.storage,
      item = _ref2.item,
      itemName = _ref2.itemName,
      lifespan = _ref2.lifespan;

  if (lifespan === 0) {
    return;
  }
  try {
    if (lifespan == null) {
      storage.setItem(itemName, isObject(item) ? JSON.stringify(item) : item);
    } else {
      var ttl = getTTL(lifespan);
      var wrapper = { ttl: ttl, item: item };
      storage.setItem(itemName, JSON.stringify(wrapper));
    }
  } catch (err) {
    console.error(err);
  }
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var initializeForStorage = function initializeForStorage(storage) {
  return {
    load: function load(itemName) {
      return loadFromStorage({ storage: storage, itemName: itemName });
    },
    set: function set$$1(itemName, item, lifespan) {
      return saveInStorage({ storage: storage, itemName: itemName, item: item, lifespan: lifespan });
    },
    hasItem: function (_hasItem) {
      function hasItem(_x) {
        return _hasItem.apply(this, arguments);
      }

      hasItem.toString = function () {
        return _hasItem.toString();
      };

      return hasItem;
    }(function (itemName) {
      return hasItem(storage, itemName);
    })
  };
};

var hasStorage = function hasStorage() {
  try {
    var mod = 'mod';
    localStorage.setItem(mod, mod);
    localStorage.removeItem(mod);
    return true;
  } catch (e) {
    return false;
  }
};
var StorageWrapper = function StorageWrapper() {
  classCallCheck(this, StorageWrapper);

  if (hasStorage) {
    console.error('window object not available. cannot set storage items');
  } else {
    this.local = initializeForStorage(localStorage);
    this.session = initializeForStorage(sessionStorage);
    console.warn('storage wrapper initialized.');
  }
};

var storage = new StorageWrapper();

module.exports = storage;
