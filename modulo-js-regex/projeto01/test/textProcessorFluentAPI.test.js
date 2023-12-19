const { describe, it } = require('mocha');
const { expect } = require('chai');
const TextProcessorAPI = require('../src/textProcessorFluentAPI');
const mock = require('./mock/validMock');

describe('TextProcessorFluentAPI suit test', () => {
  it('#build', () => {
    const result = new TextProcessorAPI(mock).build();

    expect(result).to.be.deep.equal(mock);
  });

  it('#extractPersonData', () => {
    const result = new TextProcessorAPI(mock).extractPeopleData().build();

    const expected = [
      [
        'Luffy D. Monkey, brasileiro, solteiro, CPF 235.743.420-12, residente e ',
        'domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. ',
      ].join('\n'),
      [
        'Robin Nico, austríaca, solteira, CPF 297.947.800-81, residente e ',
        'domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo. ',
      ].join('\n'),
    ];

    expect(result).to.be.deep.equal(expected);
  });

  it('divideTextInColumns', () => {
    const content = [
      [
        'Luffy D. Monkey, brasileiro, solteiro, CPF 235.743.420-12, residente e ',
        'domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. ',
      ].join('\n'),
    ];
    const result = new TextProcessorAPI(content).divideTextInColumns().build();

    const expected = [
      [
        'Luffy D. Monkey',
        ' brasileiro',
        ' solteiro',
        ' CPF 235.743.420-12',
        ' residente e \ndomiciliada a Rua dos bobos',
        ' zero',
        ' bairro Alphaville',
        ' São Paulo. ',
      ],
    ];

    expect(result).to.be.deep.equal(expected);
  });
  it('#removeEmptyCharacthers', () => {
    const content = [
      [
        'Luffy D. Monkey',
        ' brasileiro',
        ' solteiro',
        ' CPF 235.743.420-12',
        ' residente e \ndomiciliada a Rua dos bobos',
        ' zero',
        ' bairro Alphaville',
        ' São Paulo. ',
      ],
    ];

    const result = new TextProcessorAPI(content)
      .removeEmptyCharacthers()
      .build();

    const expected = [
      [
        'Luffy D. Monkey',
        'brasileiro',
        'solteiro',
        'CPF 235.743.420-12',
        'residente e domiciliada a Rua dos bobos',
        'zero',
        'bairro Alphaville',
        'São Paulo.',
      ],
    ];

    expect(result).to.be.deep.equal(expected);
  });

  it('#mapPerson', () => {
    const content = [
      [
        'Luffy D. Monkey',
        'brasileiro',
        'solteiro',
        'CPF 235.743.420-12',
        'residente e domiciliada a Rua dos bobos',
        'zero',
        'bairro Alphaville',
        'São Paulo.',
      ],
    ];

    const result = new TextProcessorAPI(content).build();

    const expected = [
      {
        name: 'Luffy D. Monkey',
        nationality: 'Brasileiro',
        maritalState: 'Solteiro',
        documentID: '23574342012',
        address: 'Rua dos bobos',
        number: 'zero',
        neighborhood: 'Alphaville',
        state: 'São Paulo',
      },
    ];

    expect(expected).to.be.deep.equal(expected);
  });
});
