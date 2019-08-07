import StorageWrapper from "../src/storage";
import StorageMock from "../__mocks__/storage";

const testObj = { testString: "foo" };
const testArray = [1, 2, 3, 4, 5];
const items = [
  { name: "test_string", value: "foo" },
  { name: "test_object", value: testObj },
  { name: "test_array", value: testArray }
];

describe("StorageWrapper class", () => {
  it("should return null / false if storage not available", () => {
    global.console = { log: jest.fn() };
    const storageWrapper = new StorageWrapper();
    const loadedItem = storageWrapper.local.load("test");
    const hadSuccessSetting = storageWrapper.local.set("test", "test");
    const hadSuccessChecking = storageWrapper.local.has("test");
    expect(loadedItem).toBeNull();
    expect(hadSuccessSetting).toBe(false);
    expect(hadSuccessChecking).toBe(false);
  });

  it("should return value if present (w/o ttl)", () => {
    global.sessionStorage = new StorageMock();
    const storageWrapper = new StorageWrapper();
    items.forEach(item => storageWrapper.session.set(item.name, item.value));
    items.forEach(item =>
      expect(storageWrapper.session.load(item.name)).toEqual(item.value)
    );
  });

  it("should not return value if not present", () => {
    global.sessionStorage = new StorageMock();
    const storageWrapper = new StorageWrapper();
    const names = ["test_string", "test_object", "test_array"];
    names.forEach(name => expect(storageWrapper.session.load(name)).toBe(null));
  });

  it("should return value if present (w ttl)", () => {
    global.sessionStorage = new StorageMock();
    const date = new Date();
    date.setMilliseconds(0);
    global.Date = jest.fn(() => date);
    const storageWrapper = new StorageWrapper();
    items.forEach(item => storageWrapper.session.set(item.name, item.value, 1));
    items.forEach(item =>
      expect(storageWrapper.session.load(item.name)).toEqual(item.value)
    );
    date.setMilliseconds(2);
    items.forEach(item =>
      expect(storageWrapper.session.load(item.name)).toBe(null)
    );
    global.Date = Date;
  });

  it("should update lifespan correctly", () => {
    global.sessionStorage = new StorageMock();
    const date = new Date();
    date.setMilliseconds(0);
    global.Date = jest.fn(() => date);
    const storageWrapper = new StorageWrapper();
    items.forEach(item => storageWrapper.session.set(item.name, item.value, 1));
    items.forEach(item => storageWrapper.session.setLifespan(item.name, 10));
    date.setMilliseconds(10);
    items.forEach(item =>
      expect(storageWrapper.session.load(item.name)).toEqual(item.value)
    );
    global.Date = Date;
  });
});
