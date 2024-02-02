import Product from '../../src/entities/product.js';

export default class Cart {
  constructor({ products }) {
    this.products = products;
    this.total = this.getCartPrice();
  }
  getCartPrice() {
    // let price = 0;
    // for (const product of this.products) {
    //   price += product.price || 0;
    // }
    // return price;
    this.products.reduce((acc, next) => (acc.price || 0) + next, 0);
  }
}
