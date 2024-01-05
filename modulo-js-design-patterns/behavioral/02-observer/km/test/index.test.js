import { describe, expect, test, jest, beforeAll } from '@jest/globals';
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
  test.todo('#Payment should notify subject after a credit card transaction');
  test.todo('#Payment should notify subscribers after a credit card payment');
});
