const ProductDataBuilder = require('./productDataBuilder');
class ProductMotherObject {
  static valid() {
    return ProductDataBuilder.generate().build();
  }

  static withInvalidId() {
    return ProductDataBuilder.generate().withInvalidId().build();
  }

  static withInvalidPrice() {
    return ProductDataBuilder.generate().withInvalidPrice().build();
  }

  static withInvalidName() {
    return ProductDataBuilder.generate().withInvalidName().build();
  }

  static withInvalidCategory() {
    return ProductDataBuilder.generate().withInvalidCategory().build();
  }

  static withMultipleInvalidFields() {
    return ProductDataBuilder.generate().withMultipleInvalidFields().build();
  }
}

module.exports = ProductMotherObject;
