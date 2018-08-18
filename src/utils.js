let shouldLog;

export const activateLogs = () => {
  shouldLog = true;
};

export const trackInfo = (...args) =>
  shouldLog && console.log(`[JsStorageWrap] `, ...args);

export const getTTL = lifespan => {
  const currentTime = new Date().getTime();
  return lifespan > 0 ? currentTime + lifespan : currentTime;
};

export const isValidTTL = timestamp => {
  const currentTime = new Date().getTime();
  return currentTime <= timestamp;
};

export const isObject = val => val === Object(val);

export const getObjectFromString = string => {
  if (typeof string === "number") {
    return null;
  }
  try {
    return JSON.parse(string);
  } catch (e) {
    return null;
  }
};
