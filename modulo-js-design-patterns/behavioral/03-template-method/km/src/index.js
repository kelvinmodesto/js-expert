import OrderBusiness from './business/orderBusiness.js';
import Order from './entities/order.js';

const order = new Order({
  customerId: '56asl',
  amount: 1,
  products: [{ description: 'straw hat' }],
});

const orderBusiness = new OrderBusiness();
console.log(orderBusiness.create(order));
