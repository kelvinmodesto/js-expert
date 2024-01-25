import {
  describe,
  expect,
  test,
  jest,
  beforeAll,
  beforeEach,
  afterAll,
} from '@jest/globals';

import { tmpdir } from 'os';
import { join } from 'path';
import fsPromises from 'fs/promises';
import { createLayersIfNotExists } from '../../src/createLayers.js';

async function getFolders({ mainPath, defaultMainFolder }) {
  return fsPromises.readdir(join(mainPath, defaultMainFolder));
}

describe('#Integration - Layers - Folder Structure', () => {
  const config = {
    defaultMainFolder: 'src',
    mainPath: '',
    // colocamos um sort, pq o sistema operacional retorna em ordem alfabetica
    layers: ['service', 'factory', 'repository'].sort(),
  };

  beforeAll(async () => {
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'skeleton-'));
  });

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await fsPromises.rm(config.mainPath, { recursive: true });
  });

  test('should create folders if it doesnt exists', async () => {
    const beforeRun = await fsPromises.readdir(config.mainPath);

    await createLayersIfNotExists(config);

    const afterRun = await getFolders(config);
    expect(beforeRun).not.toStrictEqual(afterRun);
    // expect(beforeRun).toEqual(config.layers);
  });

  test('should not create folders if already exists', async () => {
    const beforeRun = await getFolders(config);

    await createLayersIfNotExists(config);

    const afterRun = await getFolders(config);
    expect(afterRun).toEqual(beforeRun);
  });
});
