import { describe, expect, jest, beforeEach, test } from '@jest/globals';
import {
  upperCaseFirstLetter,
  lowerCaseFirstLetter,
} from './../../src/util.js';
describe('#Util - Strings', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test('#upperCaseFirstLetter should transform the first letter in upper case', () => {
    const data = 'hello';
    const expected = 'Hello';
    const result = upperCaseFirstLetter(data);

    expect(result).toStrictEqual(expected);
  });
  test('#upperCaseFirstLetter given an empty string it should return empty', () => {
    const data = '';
    const expected = '';
    const result = upperCaseFirstLetter(data);

    expect(result).toStrictEqual(expected);
  });

  test('#lowerCaseFirstLetter should transform the first letter in lower case', () => {
    const data = 'Hello';
    const expected = 'hello';
    const result = lowerCaseFirstLetter(data);

    expect(result).toStrictEqual(expected);
  });
  test('#lowerCaseFirstLetter given an empty string it should return empty', () => {
    const data = '';
    const expected = '';
    const result = lowerCaseFirstLetter(data);

    expect(result).toStrictEqual(expected);
  });
});
