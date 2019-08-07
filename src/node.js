const storage = {
  load: () => false,
  set: () => false,
  setLifespan: () => false,
  has: () => false
};

export default {
  local: storage,
  session: storage
};
