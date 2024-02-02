import database from '../database.js';
import Product from './entities/product.js';
import Cart from './entities/cart.js';

const cart = new Cart(database);
