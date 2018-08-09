import { loadFromStorage } from '../src/storageHelpers';
import { StorageMock } from '../__mocks__/storage';

const date = new Date();
const testObj = { testString: 'foo' };
const testArray = [1, 2, 3, 4, 5];

beforeEach(() => {
  global.Date = jest.fn(() => date);
});

afterEach(() => {
  global.Date = Date;
});

test('[loadFromStorage] should return null if value is not present', () => {
  const storage = {
    getItem: jest.fn(),
  };
  const storageFn = () => storage;
  const item = loadFromStorage({ storageFn, itemName: 'test' });
  expect(storage.getItem).toHaveBeenCalledTimes(1);
  expect(item).toBeNull();
});

test('[loadFromStorage] should return parsed value if present (no ttl)', () => {
  const storageMock = new StorageMock();
  const items = [
    { name: 'test_string', value: 'foo' },
    { name: 'test_object', value: JSON.stringify(testObj) },
    { name: 'test_array', value: JSON.stringify(testArray) },
  ];
  items.forEach(i => storageMock.setItem(i.name, i.value));
  const storageFn = () => storageMock;
  items.forEach((i, index) => {
    const expected = index === 0 ? i.value : JSON.parse(i.value);
    expect(loadFromStorage({ storageFn, itemName: i.name })).toEqual(expected);
  });
});

test('[loadFromStorage] should not return value if ttl is expired', () => {
  const storageMock = new StorageMock();
  const currentTime = new Date().getTime();
  const ttl = currentTime - 1;
  const items = [
    { name: 'test_string', value: JSON.stringify({ ttl, item: 'foo' }) },
    { name: 'test_object', value: JSON.stringify({ ttl, item: testObj }) },
    { name: 'test_array', value: JSON.stringify({ ttl, item: testArray }) },
  ];
  items.forEach(i => storageMock.setItem(i.name, i.value));
  const storageFn = () => storageMock;
  items.forEach(i => expect(loadFromStorage({ storageFn, itemName: i.name })).toBeNull());
});
