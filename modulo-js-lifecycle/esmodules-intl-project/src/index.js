import TerminalController from './terminalController.js';
import database from './../database.json';
import Person from './person.js';
import { save } from './repository.js';

const DEFAULT_LANG = 'pt-BR';
const STOP_TERM = ':q';

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
  try {
    const answer = await terminalController.question();

    if (answer === STOP_TERM) {
      console.log('process finished...')
      terminalController.closeTerminal();
      return;
    }

    const person = Person.generateInstanceFromString(answer);
    terminalController.updateTable(person.format(DEFAULT_LANG));

    await save(person);

    return mainLoop();
  } catch (error) {
    console.error(`Error: ${error}`);
    return mainLoop();
  }
}

await mainLoop();
