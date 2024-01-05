import Payment from './events/payment.js';
import Ecommerce from './observers/ecommerce.js';
import Marketing from './observers/marketing.js';
import PaymentSubject from './subjects/paymentSubject.js';

const subject = new PaymentSubject();
const payment = new Payment(subject);
const ecommerce = new Ecommerce();
const marketing = new Marketing();

subject.subscribe(ecommerce);
subject.subscribe(marketing);

payment.creditCard({ userName: 'goldroger', id: Date.now() });

subject.unsubscribe(marketing);

payment.creditCard({ userName: 'silversrayleigh', id: Date.now() });
