import TerminalController from './terminalController.js';
import database from './../database.json';
import Person from './person.js';

const DEFAULT_LANG = 'pt-BR';
const STOP_TERM = ':q';
// terminal.question('Whats your name?', msg => {
//   console.log('msg', msg.toString());
// })


const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
  try {
    const answer = await terminalController.question();

    if (answer === STOP_TERM) {
      console.log('bye')
      terminalController.closeTerminal();
      return;
    }
    return mainLoop();
  } catch (error) {
    console.error(`Error: ${error}`);
    return mainLoop();
  }
}

await mainLoop();
