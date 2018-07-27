import { loadFromStorage } from '../src/storageHelpers';
import {StorageMock} from "../__mocks__/storage";

test('[loadFromStorage] should return null if value is not present', () => {
  const storage = {
    getItem: jest.fn()
  };
  const storageFn = () => storage;
  const item = loadFromStorage({ storageFn, itemName: 'test' });
  expect(storage.getItem).toHaveBeenCalledTimes(1);
  expect(item).toBeNull();
});

test('[loadFromStorage] should return parsed value if present ', () => {
  const storageMock = new StorageMock();
  const testObj = { testString: 'foo' };
  const testArray = [ 1, 2, 3, 4, 5 ];
  const items = [
      { name: 'test_string', value: 'foo' },
      { name: 'test_object', value: JSON.stringify(testObj) },
      { name: 'test_array', value: JSON.stringify(testArray) },
  ];
  items.forEach(i => storageMock.setItem(i.name, i.value));
  console.warn({storageMock});
  const storageFn = () => storageMock;
  items.forEach((i, index) => {
    const expected = index === 0 ? i.value : JSON.parse(i.value);
    expect(loadFromStorage({ storageFn, itemName: i.name })).toEqual(expected)
  });
});
