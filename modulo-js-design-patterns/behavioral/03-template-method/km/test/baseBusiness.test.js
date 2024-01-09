import { expect, jest, describe, test, beforeEach } from '@jest/globals';
import BaseBusiness from '../src/business/base/baseBusiness';
import {
  NotValidException,
  NotImplementedException,
} from '../src/util/exceptions';

describe('#BaseBusiness suite test', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('should throw an error when child class does not implements _validateFields', () => {
    class ConcreteClass extends BaseBusiness {}
    const concreteClass = new ConcreteClass();

    const validationError = new NotImplementedException(
      concreteClass._validateFields.name
    );

    expect(() => concreteClass.create({})).toThrow(validationError);
  });
  test('should throw an error when _validateFields returns false', () => {
    const VALIDATION_FAILED = false;
    class ConcreteClass extends BaseBusiness {
      _validateFields = jest.fn().mockReturnValue(VALIDATION_FAILED);
    }
    const concreteClass = new ConcreteClass();

    const validationError = new NotValidException(
      concreteClass._validateFields.name
    );

    expect(() => concreteClass.create({})).toThrow(validationError);
  });

  test('should throw an error when child class does not implements _create', () => {
    const SUCCEEDED = true;
    class ConcreteClass extends BaseBusiness {
      _validateFields = jest.fn().mockReturnValue(SUCCEEDED);
    }
    const concreteClass = new ConcreteClass();

    const validationError = new NotImplementedException(
      concreteClass._create.name
    );

    expect(() => concreteClass.create({})).toThrow(validationError);
  });

  test('should call _validateFields and _create on criate', () => {
    const SUCCEEDED = true;

    class ConcreteClass extends BaseBusiness {
      _validateFields = jest.fn().mockReturnValue(SUCCEEDED);
      _create = jest.fn().mockReturnValue(SUCCEEDED);
    }
    const concreteClass = new ConcreteClass();
    const createFromBaseClass = jest.spyOn(
      BaseBusiness.prototype,
      BaseBusiness.prototype.create.name
    );

    const result = concreteClass.create({});

    expect(result).toBeTruthy();
    expect(createFromBaseClass).toHaveBeenCalled();
    expect(concreteClass._validateFields).toHaveBeenCalled();
    expect(concreteClass._create).toHaveBeenCalled();
  });
});
