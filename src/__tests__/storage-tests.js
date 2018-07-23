import { StorageWrapper } from '../storage';

test('[StorageWrapper] should log error if window is not accessible', () => {
  global.console = { error: jest.fn() };
  new StorageWrapper();
  expect(console.error).toHaveBeenCalledTimes(1);
});