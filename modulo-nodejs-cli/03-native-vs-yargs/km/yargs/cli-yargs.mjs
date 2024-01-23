import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const hero = ({ name, power, age }) => ({ name, power, age, id: Date.now() });

const { argv } = yargs(hideBin(process.argv))
  .command('createPirate', 'create a pirate', (builder) => {
    return builder
      .option('name', {
        alias: 'n',
        demandOption: true,
        describe: 'Pirate name',
        type: 'string',
      })
      .option('age', {
        alias: 'a',
        demandOption: true,
        describe: 'Pirate age',
        type: 'number',
      })
      .option('power', {
        alias: 'p',
        demandOption: false,
        describe: 'Pirate power',
        type: 'string',
      })
      .example(
        'createPirate --name luffy --age 19 --power gum',
        'create a pirate'
      )
      .example('createPirate --n zoro --a 21', 'create a pirate');
  })
  .epilog('Copyright 2023 - Kelvin Modesto');

console.log(hero(argv));
