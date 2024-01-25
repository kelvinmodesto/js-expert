import { describe, expect, jest, beforeEach, test } from '@jest/globals';
import fsPromises from 'fs/promises';

import templates from '../../src/templates/index.js';
import { createFiles } from './../../src/createFiles.js';

describe('#Layers - Files', () => {
  const defaultLayers = ['repository', 'service', 'factory'];
  const config = {
    layers: defaultLayers,
    mainPath: './',
    defaultMainFolder: 'src',
    componentName: 'pirates',
  };
  const repositoryLayer = `${config.componentName}Repository`;
  const serviceLayer = `${config.componentName}Service`;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  test('should not create file structure on inexistent templates', async () => {
    const myConfig = {
      ...config,
      layers: ['unknown'],
    };

    const expected = { error: 'the chosen layer doesnt have a template' };
    const result = await createFiles(myConfig);

    expect(result).toStrictEqual(expected);
  });
  test('repository should not add any extra dependency', async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();
    jest
      .spyOn(templates, templates.repositoryTemplate.name)
      .mockReturnValue({ fileName: '', template: '' });

    const myConfig = {
      ...config,
      layers: ['repository'],
    };

    const expected = { success: true };
    const result = await createFiles(myConfig);

    expect(result).toStrictEqual(expected);

    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length);
    expect(templates.repositoryTemplate).toBeCalledWith(myConfig.componentName);
  });
  test('service should have only repository as dependency', async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();
    jest
      .spyOn(templates, templates.serviceTemplate.name)
      .mockReturnValue({ fileName: '', template: '' });

    const myConfig = {
      ...config,
      layers: ['repository', 'service'],
    };

    const expected = { success: true };
    const result = await createFiles(myConfig);

    expect(result).toStrictEqual(expected);

    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length);
    expect(templates.serviceTemplate).toBeCalledWith(
      myConfig.componentName,
      repositoryLayer
    );
  });
  test('factory should have repository and service as dependencies', async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();
    jest
      .spyOn(templates, templates.factoryTemplate.name)
      .mockReturnValue({ fileName: '', template: '' });

    const myConfig = {
      ...config,
    };

    const expected = { success: true };
    const result = await createFiles(myConfig);

    expect(result).toStrictEqual(expected);

    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length);
    expect(templates.factoryTemplate).toBeCalledWith(
      myConfig.componentName,
      repositoryLayer,
      serviceLayer
    );
  });
});
