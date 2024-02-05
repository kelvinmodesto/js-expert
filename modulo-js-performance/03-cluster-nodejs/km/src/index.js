import cluster from 'cluster';
import os from 'os';
import { initializeServer } from './server';

(() => {
  // se não for o processo main, o orquestrador
  // ele pode criar novas cópias
})();
