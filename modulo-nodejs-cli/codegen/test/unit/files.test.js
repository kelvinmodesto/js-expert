import { describe, expect, jest, beforeEach, test } from '@jest/globals';
import {
  upperCaseFirstLetter,
  lowerCaseFirstLetter,
} from './../../src/util.js';
describe('#Layers - Files', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  test.todo('should not create file structure on inexistent templates');
  test.todo('repository should not add any extra dependency');
  test.todo('service should have only repository as dependency');
  test.todo('factory should have repository and service as dependencies');
});
