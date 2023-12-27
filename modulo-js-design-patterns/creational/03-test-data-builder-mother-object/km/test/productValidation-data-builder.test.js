const { describe, it } = require('mocha');
const { expect } = require('chai');
const { validateProduct } = require('./../src');
const ProductDataBuilder = require('./model/productDataBuilder');

describe('ProducDataBuilder suit test', () => {
  it("shouldn't return error with valid product", () => {
    const product = ProductDataBuilder.generate().build();
    const result = validateProduct(product);

    const expected = {
      result: true,
      errors: [],
    };

    expect(result).to.be.deep.equal(expected);
  });

  describe('ProductDataBuilder error scenarios', () => {
    it('should return object when create Product with an invalid id', () => {
      const product = ProductDataBuilder.generate().withInvalidId().build();
      const result = validateProduct(product);

      const expected = {
        result: false,
        errors: ['id: invalid length, 1 should be between 2 and 20'],
      };

      expect(result).to.be.deep.equal(expected);
    });
    it('should return object when create Product with an invalid name', () => {
      const product = ProductDataBuilder.generate().withInvalidName().build();
      const result = validateProduct(product);

      const expected = {
        result: false,
        errors: ['name: invalid value, abc123 expected to have only words'],
      };

      expect(result).to.be.deep.equal(expected);
    });
    it('should return object when create Product with an invalid price', () => {
      const product = ProductDataBuilder.generate().withInvalidPrice().build();
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
      const product = ProductDataBuilder.generate()
        .withInvalidCategory()
        .build();
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
      const product = ProductDataBuilder.generate()
        .withMultipleInvalidFields()
        .build();
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
