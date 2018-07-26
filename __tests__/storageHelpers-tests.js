import { loadFromStorage } from '../src/storageHelpers';

test('[loadFromStorage] should return null if item is not present', () => {
  const storage = {
    loadItem: jest.fn()
  };
  const storageFn = () => storage;
  const item = loadFromStorage({ storageFn, itemName: 'test' });
  expect(item).toBeNull();
});
