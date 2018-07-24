import { getTTL, isValidTTL, isObject, getObjectFromString } from '../src/utils';

const date = new Date();

beforeEach(() => {
  global.Date = jest.fn(() => date);
});

afterEach(() => {
  global.Date = Date;
});

test('[getTTL] should return correct ttl for pre-determined lifespan', () => {
  const lifespanMs = 1000;
  const negativeLifespanMs = -1000;
  expect(getTTL(lifespanMs)).toBe((date.getTime() + lifespanMs));
  expect(getTTL(negativeLifespanMs)).toBe((date.getTime()));
});

test('[isValidTTL] should return false/true if ttl is reached/future', () => {
  const lifespanMs = 1000;
  const pastTimestamp = date.getTime() - 1;
  const futureTimestamp = date.getTime() + 1;
  const now = date.getTime();
  expect(isValidTTL(pastTimestamp)).toBe(false);
  expect(isValidTTL(futureTimestamp)).toBe(true);
  expect(isValidTTL(now)).toBe(true);
});

test('[isObject] should return correct value', () => {
  expect(isObject({})).toBe(true);
  expect(isObject([])).toBe(true);
  expect(isObject('')).toBe(false);
  expect(isObject(1)).toBe(false);
  expect(isObject(1.23)).toBe(false);
});

test('[getObjectFromString] should return correct value', () => {
  const object = { test: 5 };
  const array = [1, 2, 3, 4];
  const string = 'test';
  const number = 1234;
  expect(getObjectFromString(JSON.stringify(object))).toEqual(object);
  expect(getObjectFromString(JSON.stringify(array))).toEqual(array);
  expect(getObjectFromString(string)).toBeNull();
  expect(getObjectFromString(number)).toBeNull();
})
