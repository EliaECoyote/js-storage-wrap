import { loadFromStorage } from '../src/storageHelpers';

test('[loadFromStorage] should return null if item is not present', () => {
  const storage = {
    getItem: jest.fn()
  };
  const storageFn = () => storage;
  const item = loadFromStorage({ storageFn, itemName: 'test' });
  expect(storage.getItem).toHaveBeenCalledTimes(1);
  expect(item).toBeNull();
});
