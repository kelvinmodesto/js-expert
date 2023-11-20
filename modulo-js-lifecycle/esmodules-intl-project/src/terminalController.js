import chalk from 'chalk';
import chalkTable from 'chalk-table';
import DraftLog from 'draftlog';

import readline from 'readline';
import Person from './person.js';

export default class TerminalController {

  constructor() {
    this.data = {};
    this.print = {};
  }

  initializeTerminal(database, language) {
    DraftLog(console).addLineListener(process.stdin);
    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.initializeTable(database, language);
  }

  initializeTable(database, language) {
    this.data = database.map(item => new Person(item).format(language));
    const table = chalkTable(this.getTableOptions(), this.data);

    this.print = console.draft(table);
  }

  closeTerminal() {
    this.terminal.close();
  }

  /** @type {string} msg **/
  question(msg = '') {
    return new Promise(resolve => this.terminal.question(msg, resolve));
  }

  getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: "id", name: chalk.cyan("ID")},
        { field: "vehicles", name: chalk.magenta("Vehicles")},
        { field: "kmTraveled", name: chalk.yellow("Km Traveled")},
        { field: "from", name: chalk.green("From")},
        { field: "to", name: chalk.red("To")},
      ]
    }
  }

}
