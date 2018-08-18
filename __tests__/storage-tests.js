import StorageWrapper from "../src/storage";
import StorageMock from "../__mocks__/storage";

const date = new Date();
const testObj = { testString: "foo" };
const testArray = [1, 2, 3, 4, 5];
const lifespan = 200;

beforeEach(() => {
  global.Date = jest.fn(() => date);
});

afterEach(() => {
  global.Date = Date;
});

test("[StorageWrapper] should return null / false if storage not available", () => {
  global.console = { log: jest.fn() };
  const executeTest = dev => {
    const storageWrapper = new StorageWrapper();
    if (dev) {
      storageWrapper.developmentMode();
    }
    const loadedItem = storageWrapper.local.load("test");
    const hadSuccessSetting = storageWrapper.local.set("test", "test");
    const hadSuccessChecking = storageWrapper.local.has("test");
    expect(loadedItem).toBeNull();
    expect(hadSuccessSetting).toBe(false);
    expect(hadSuccessChecking).toBe(false);
  };
  executeTest(false);
  expect(console.log).toHaveBeenCalledTimes(0);
  executeTest(true);
  expect(console.log).toHaveBeenCalledTimes(3);
});

test("[StorageWrapper] should return value if present (w/o ttl)", () => {
  global.sessionStorage = new StorageMock();
  const storageWrapper = new StorageWrapper();
  const items = [
    { name: "test_string", value: "foo" },
    { name: "test_object", value: testObj },
    { name: "test_array", value: testArray }
  ];
  items.forEach(item => storageWrapper.session.set(item.name, item.value));
  items.forEach(item => {
    expect(storageWrapper.session.load(item.name)).toEqual(item.value);
  });
});
