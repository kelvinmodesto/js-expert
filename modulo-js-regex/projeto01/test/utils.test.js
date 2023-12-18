const { describe, it } = require('mocha');
const { expect } = require('chai');
const { InvalidRegexError, verifySafety } = require('./../src/utils');

describe('Utils', () => {
  it('#verifySafety should throw an exception when an unsafe regex is used', () => {
    const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/;
    /*
      // fica rodando em loop e quebra tudo!
      catastrophic backtracking!
      time \
      node --eval "/^([a-z|A-Z|0-9]+\s?)+$/.test('eaaae man como vai voce e como vai voce e como vai voce?') && console.log('legalzin')"
    */
    expect(() => verifySafety(unsafeRegex)).to.throw(
      InvalidRegexError,
      `Unsafe regex: ${unsafeRegex}`
    );
  });

  it('#verifySafety should not throw an exception when an safe regex is used', () => {
    const safeRegex = /^([a-z])$/;
    expect(() => verifySafety(safeRegex)).to.not.throw();
    expect(verifySafety(safeRegex)).to.be.ok;
  });
});
