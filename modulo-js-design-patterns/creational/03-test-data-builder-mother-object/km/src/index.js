/*
  ProductId: should be between 2 and 20 characters
  Name: should be only words
  Price: should be from zero to a thousand
  Category: should be electronic or organic
*/
function validateProduct(product) {
  const errors = [];
  if (product.id.length <= 2 || product.id.length >= 20) {
    errors.push(`id: invalid length, ${product.id} should be between 2 and 20`);
  }
  if (/(\W|\d)/.test(product.name)) {
    errors.push(
      `name: invalid value, ${product.name} expected to have only words`
    );
  }

  if (product.price < 1 || product.price > 1000) {
    errors.push(
      `price: invalid value, ${product.price} expected to be between 1 and 1000`
    );
  }

  if (!['electronic', 'organic'].includes(product.category)) {
    errors.push(
      `category: invalid value, ${product.category} expected to be organic or electronic`
    );
  }
  return {
    result: errors.length === 0,
    errors,
  };
}

module.exports = { validateProduct };
