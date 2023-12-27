const Product = require('../../src/entities/product');

class ProductDataBuilder {
  constructor() {
    this.productData = {
      id: '123654',
      name: 'abcdefg',
      price: 999,
      category: 'organic',
    };
  }

  static generate() {
    return new ProductDataBuilder();
  }
  withInvalidId() {
    this.productData.id = '1';
    return this;
  }
  withInvalidName() {
    this.productData.name = 'abc123';
    return this;
  }
  withInvalidPrice() {
    this.productData.price = 1001;
    return this;
  }
  withInvalidCategory() {
    this.productData.category = 'biohazard';
    return this;
  }
  withMultipleInvalidFields() {
    this.productData.name = 'abc.';
    this.productData.price = -1;
    return this;
  }
  build() {
    const product = new Product(this.productData);

    return product;
  }
}

module.exports = ProductDataBuilder;
