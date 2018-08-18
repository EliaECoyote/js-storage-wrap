import { hasItem, loadFromStorage, saveInStorage } from "../src/storageHelpers";
import StorageMock from "../__mocks__/storage";

const date = new Date();
const testObj = { testString: "foo" };
const testArray = [1, 2, 3, 4, 5];
const lifespan = 200;
const plainItems = [
  { name: "test_string", value: "foo" },
  { name: "test_object", value: testObj },
  { name: "test_array", value: testArray }
];
const stringifiedItems = [
  { name: "test_string", value: "foo" },
  { name: "test_object", value: JSON.stringify(testObj) },
  { name: "test_array", value: JSON.stringify(testArray) }
];
const getStringifiedItemsArray = ttl => [
  { name: "test_string", value: JSON.stringify({ ttl, item: "foo" }) },
  { name: "test_object", value: JSON.stringify({ ttl, item: testObj }) },
  { name: "test_array", value: JSON.stringify({ ttl, item: testArray }) }
];

beforeEach(() => {
  global.Date = jest.fn(() => date);
});

afterEach(() => {
  global.Date = Date;
});

describe("loadFromStorage helper", () => {
  it("should return null if value is not present", () => {
    const storage = {
      getItem: jest.fn()
    };
    const storageFn = () => storage;
    const item = loadFromStorage({
      storageFn,
      itemName: "test"
    });
    expect(storage.getItem).toHaveBeenCalledTimes(1);
    expect(item).toBeNull();
  });

  it("should return parsed value if present (w/o ttl)", () => {
    const storageMock = new StorageMock();
    const items = stringifiedItems;
    items.forEach(i => storageMock.setItem(i.name, i.value));
    const storageFn = () => storageMock;
    items.forEach((i, index) => {
      const expected = index === 0 ? i.value : JSON.parse(i.value);
      expect(
        loadFromStorage({
          storageFn,
          itemName: i.name
        })
      ).toEqual(expected);
    });
  });

  it("should return parsed value if present (w ttl)", () => {
    const storageMock = new StorageMock();
    const currentTime = new Date().getTime();
    const ttl = currentTime + 1;
    const items = getStringifiedItemsArray(ttl);
    items.forEach(i => storageMock.setItem(i.name, i.value));
    const storageFn = () => storageMock;
    items.forEach(i => {
      const expected = JSON.parse(i.value).item;
      expect(
        loadFromStorage({
          storageFn,
          itemName: i.name
        })
      ).toEqual(expected);
    });
  });

  it("should not return value (and also removeItem) if ttl is expired", () => {
    const storageMock = new StorageMock();
    const currentTime = new Date().getTime();
    const ttl = currentTime - 1;
    const items = getStringifiedItemsArray(ttl);
    items.forEach(i => storageMock.setItem(i.name, i.value));
    const storageFn = () => storageMock;
    items.forEach(i =>
      expect(
        loadFromStorage({
          storageFn,
          itemName: i.name
        })
      ).toBeNull()
    );
    items.forEach(i => expect(storageMock.getItem(i.name)).toBeNull());
  });
});

describe("saveInStorage helper", () => {
  it("should not save if lifespan is 0", () => {
    const storageMock = new StorageMock();
    const items = plainItems;
    items.forEach(i =>
      saveInStorage({ itemName: i.name, item: i.value, lifespan: 0 })
    );
    items.forEach(i => expect(storageMock.getItem(i.name)).toBeNull());
  });

  it("should save items w/o ttl if lifespan is not defined ", () => {
    const storageMock = new StorageMock();
    const storageFn = () => storageMock;
    const items = plainItems;
    items.forEach(i =>
      saveInStorage({ storageFn, itemName: i.name, item: i.value })
    );
    expect(storageMock.getItem(items[0].name)).toEqual(items[0].value);
    expect(storageMock.getItem(items[1].name)).toEqual(
      JSON.stringify(items[1].value)
    );
    expect(storageMock.getItem(items[2].name)).toEqual(
      JSON.stringify(items[2].value)
    );
  });

  it("should save items w ttl if lifespan is defined ", () => {
    const storageMock = new StorageMock();
    const storageFn = () => storageMock;
    const currentTime = new Date().getTime();
    const ttl = currentTime + lifespan;
    const items = plainItems;
    items.forEach(i =>
      saveInStorage({ storageFn, itemName: i.name, item: i.value, lifespan })
    );
    items.forEach(i =>
      expect(storageMock.getItem(i.name)).toEqual(
        JSON.stringify({ ttl, item: i.value })
      )
    );
  });
});

describe("hasItem helper", () => {
  it("[hasItem] should return true/false if item is present/absent", () => {
    const storageMock = new StorageMock();
    const storageFn = () => storageMock;
    const currentTime = new Date().getTime();
    const ttl = currentTime + 1;
    const items = getStringifiedItemsArray(ttl);
    items.forEach(i => storageMock.setItem(i.name, i.value));
    items.forEach(i =>
      expect(hasItem({ storageFn, itemName: i.name })).toBe(true)
    );
  });
});
