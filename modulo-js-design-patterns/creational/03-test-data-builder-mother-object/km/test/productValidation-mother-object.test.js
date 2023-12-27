const { describe, it } = require('mocha');
const { expect } = require('chai');
const { validateProduct } = require('./../src');
const ProductMotherObject = require('./model/productMotherObject');

describe('ProducMotherObject suit test', () => {
  it("shouldn't return error with valid product", () => {
    const product = ProductMotherObject.valid();
    const result = validateProduct(product);

    const expected = {
      result: true,
      errors: [],
    };

    expect(result).to.be.deep.equal(expected);
  });

  describe('ProductMotherObject error scenarios', () => {
    it('should return object when create Product with an invalid id', () => {
      const product = ProductMotherObject.withInvalidId();
      const result = validateProduct(product);

      const expected = {
        result: false,
        errors: ['id: invalid length, 1 should be between 2 and 20'],
      };

      expect(result).to.be.deep.equal(expected);
    });
    it('should return object when create Product with an invalid name', () => {
      const product = ProductMotherObject.withInvalidName();
      const result = validateProduct(product);

      const expected = {
        result: false,
        errors: ['name: invalid value, abc123 expected to have only words'],
      };

      expect(result).to.be.deep.equal(expected);
    });
    it('should return object when create Product with an invalid price', () => {
      const product = ProductMotherObject.withInvalidPrice();
      const result = validateProduct(product);

      const expected = {
        result: false,
        errors: [
          'price: invalid value, 1001 expected to be between 1 and 1000',
        ],
      };

      expect(result).to.be.deep.equal(expected);
    });
    it('should return object when create Product with an invalid category', () => {
      const product = ProductMotherObject.withInvalidCategory();
      const result = validateProduct(product);

      const expected = {
        result: false,
        errors: [
          'category: invalid value, biohazard expected to be organic or electronic',
        ],
      };

      expect(result).to.be.deep.equal(expected);
    });
    it('should return object when create Product with multiple invalid fields', () => {
      const product = ProductMotherObject.withMultipleInvalidFields();
      const result = validateProduct(product);

      const expected = {
        result: false,
        errors: [
          'name: invalid value, abc. expected to have only words',
          'price: invalid value, -1 expected to be between 1 and 1000',
        ],
      };

      expect(result).to.be.deep.equal(expected);
    });
  });
});
