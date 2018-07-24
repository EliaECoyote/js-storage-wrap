import { StorageWrapper } from '../storage';

test('[StorageWrapper] should return null / false if storage not available', () => {
  global.console = { warn: jest.fn() };
  const storageWrapper = new StorageWrapper();
  const loadedItem = storageWrapper.local.load('test');
  const hadSuccessSetting = storageWrapper.local.set('test', 'test');
  const hadSuccessChecking = storageWrapper.local.has('test');
  expect(loadedItem).toBeNull;
  expect(hadSuccessSetting).toBe(false);
  expect(hadSuccessChecking).toBe(false);
  expect(console.warn).toHaveBeenCalledTimes(3);
});
