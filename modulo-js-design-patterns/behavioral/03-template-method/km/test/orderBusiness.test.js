import { expect, jest, describe, test, beforeEach } from '@jest/globals';
import OrderBusiness from '../src/business/orderBusiness';
import Order from '../src/entities/order';

describe('Test suite for Template Method design pattern', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  describe('#OrderBusiness', () => {
    test('execution Order Business without Template Method', () => {
      const order = new Order({
        customerId: 1,
        amount: 100000,
        products: [{ description: 'boat', name: 'Thousand Sunny' }],
      });
      const orderBusiness = new OrderBusiness();

      const isValid = orderBusiness._validateFields(order);

      expect(isValid).toBeTruthy();

      const result = orderBusiness._create(order);
      expect(result).toBeTruthy();
    });
    test('execution Order Business with Template Method', () => {
      const order = new Order({
        customerId: 1,
        amount: 100000,
        products: [{ description: 'boat', name: 'Thousand Sunny' }],
      });
      const orderBusiness = new OrderBusiness();
      const calledValidationFn = jest.spyOn(
        orderBusiness,
        orderBusiness._validateFields.name
      );

      const calledCreateFn = jest.spyOn(
        orderBusiness,
        orderBusiness._create.name
      );

      const result = orderBusiness.create(order);
      expect(result).toBeTruthy();
      expect(calledValidationFn).toHaveBeenCalled();
      expect(calledCreateFn).toHaveBeenCalled();
    });
  });
});
