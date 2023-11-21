import chai from 'chai';
import mocha from 'mocha';
import sinon from 'sinon';

const { describe, it, afterEach, beforeEach } = mocha;
const { expect } = chai;
import TerminalController from '../src/terminalController.js';
import { mockDatabase } from './mocks/database.js';
const DEFAULT_LANG = 'pt-BR';
describe('Terminal Controller Suit test', () => {
  let terminalController = {};
  beforeEach(() => {
    terminalController = new TerminalController();
    terminalController.initializeTerminal(mockDatabase, DEFAULT_LANG);
  });
  afterEach(() => {
    terminalController.closeTerminal();
  });
  it('should get static options for terminal', () => {
    const result  = terminalController.getTableOptions();
    const expected = {
      leftPad: 2,
      columns: [
        { field: 'id', name: '\x1B[36mID\x1B[39m' },
        { field: 'vehicles', name: '\x1B[35mVehicles\x1B[39m' },
        { field: 'kmTraveled', name: '\x1B[33mKm Traveled\x1B[39m' },
        { field: 'from', name: '\x1B[32mFrom\x1B[39m' },
        { field: 'to', name: '\x1B[31mTo\x1B[39m' }
      ]
    };

    expect(result).to.be.deep.equal(expected);
  });
  it('should make question', () =>  {

  });
  it('should update table', () =>  {

  });
});
