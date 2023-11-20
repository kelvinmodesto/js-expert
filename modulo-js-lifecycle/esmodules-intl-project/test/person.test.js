import chai from 'chai';
import mocha from 'mocha';

const { describe, it } = mocha;
const { expect } = chai;
import Person from './../src/person.js';

describe('Person Suit test', () => {

  it('should return an instance of Person from a string', () => {
    const person = Person.generateInstanceFromString(
      '1 havaianas,hb20 300 2023-11-19 2023-11-20'
    );
    const expected = {
      id: '1',
      from: '2023-11-19',
      to: '2023-11-20',
      vehicles: ['havaianas', 'hb20'],
      kmTraveled: '300',
    };

    expect(person).to.be.deep.equal(expected);
  });

  it('should format values', () => {
    const person = new Person({
      id: 1,
      from: '2023-11-19',
      to: '2023-11-20',
      vehicles: ['havaianas', 'hb20'],
      kmTraveled: '300',
    });

    const result =  person.format('pt-BR');

    const expected = {
      id: 1,
      from: '19 de novembro de 2023',
      to: '20 de novembro de 2023',
      vehicles: 'havaianas e hb20',
      kmTraveled: '300 km',
    };

    expect(result).to.be.deep.equal(expected);
  });

});
