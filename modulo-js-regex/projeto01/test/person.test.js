const { describe, it } = require('mocha');
const { expect } = require('chai');
const Person = require('../src/person');

describe('Person', () => {
  it('should an instance of person from properties list', () => {
    const content = [
      'Luffy D. Monkey',
      'brasileiro',
      'solteiro',
      'CPF 235.743.420-12',
      'residente e domiciliada a Rua dos bobos',
      'zero',
      'bairro Alphaville',
      'São Paulo.',
    ];
    const result = new Person(content);
    const expected = {
      name: 'Luffy D. Monkey',
      nationality: 'Brasileiro',
      maritalState: 'Solteiro',
      documentID: '23574342012',
      address: 'Rua dos bobos',
      number: 'zero',
      neighborhood: 'Alphaville',
      state: 'São Paulo',
    };

    expect(result).to.be.deep.equal(expected);
  });
});
