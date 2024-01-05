import { describe, expect, test, jest, beforeAll } from '@jest/globals';
import Ecommerce from '../src/observers/ecommerce';
import Marketing from '../src/observers/marketing';
import Payment from '../src/events/payment';
import PaymentSubject from '../src/subjects/paymentSubject';

describe('#Payment suite test', () => {
  test('#PaymentSubject should notify observers', () => {
    const subject = new PaymentSubject();
    const observer = {
      update: jest.fn(),
    };

    const data = 'hello world';
    const expected = data;

    subject.subscribe(observer);
    subject.notify(data);

    expect(observer.update).toBeCalledWith(expected);
  });
  test('#PaymentSubject should not notify unsubscribed observers', () => {
    const subject = new PaymentSubject();
    const observer = {
      update: jest.fn(),
    };

    const data = 'hello world';

    subject.subscribe(observer);
    subject.unsubscribe(observer);
    subject.notify(data);

    expect(observer.update).not.toHaveBeenCalled();
  });

  test('#Payment should notify subject after a credit card transaction', () => {
    const subject = new PaymentSubject();
    const payment = new Payment(subject);

    const paymentSubjectNotifierSpy = jest.spyOn(
      payment.paymentSubject,
      payment.paymentSubject.notify.name
    );

    const data = { userName: 'bartholomewkuma', id: Date.now() };

    payment.creditCard(data);

    expect(paymentSubjectNotifierSpy).toBeCalledWith(data);
  });
  test('#Payment should notify subscribers after a credit card payment', () => {
    const subject = new PaymentSubject();
    const ecommerce = new Ecommerce();
    const marketing = new Marketing();

    const marketingSpy = jest.spyOn(marketing, marketing.update.name);
    const ecommerceSpy = jest.spyOn(ecommerce, ecommerce.update.name);

    subject.subscribe(ecommerce);
    subject.subscribe(marketing);

    const payment = new Payment(subject);
    const data = { userName: 'bartholomewkuma', id: Date.now() };

    payment.creditCard(data);

    expect(marketingSpy).toBeCalledWith(data);
    expect(ecommerceSpy).toBeCalledWith(data);
  });
});
