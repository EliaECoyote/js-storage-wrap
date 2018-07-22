export const getTTL = lifespan => {
  const currentTime = new Date().getTime();
  return lifespan > 0 ? currentTime + lifespan : currentTime;
};

export const isValidTTL = timestamp => {
  const currentTime = new Date().getTime();
  return currentTime <= timestamp;
};

export const isObject = val => val === Object(val);

export const getObjectFromString = (string) => {
  try {
    return JSON.parse(string);
  } catch(e) {
    console.error('[webStorageWrapper error]', e);
    return null;
  }
};