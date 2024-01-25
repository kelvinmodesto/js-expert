import fsPromises from 'fs/promises';
import templates from './templates/index.js';
import { lowerCaseFirstLetter } from './util.js';

// hashmap pattern
const defaultDependencies = (layer, componentName) => {
  const dependencies = {
    repository: [],
    service: [`${componentName}Repository`],
    factory: [`${componentName}Repository`, `${componentName}Service`],
  };

  // Pode ser que venha: Product
  // Quero que retorne: product
  return dependencies[layer].map(lowerCaseFirstLetter);
};

const executeWrites = async (pendingList) => {
  return Promise.all(
    pendingList.map(({ fileName, txtFile }) =>
      fsPromises.writeFile(fileName, txtFile)
    )
  );
};

export async function createFiles({
  mainPath,
  defaultMainFolder,
  layers,
  componentName,
}) {
  const keys = Object.keys(templates);
  const pendingList = [];

  for (const layer of layers) {
    /*
      keys = [
          factoryTemplate,
          serviceTemplate,
          repositoryTemplate
      ]

      layers = ['inexistent']

    */
    const chosenTemplate = keys.find((key) => key.includes(layer));
    if (!chosenTemplate) {
      return { error: 'the chosen layer doesnt have a template' };
    }

    const template = templates[chosenTemplate];
    // só o exemplo debaixo /Users/Document/jsexpert/codegen/src/factory
    const targetFolder = `${mainPath}/${defaultMainFolder}/${layer}`;
    const dependencies = defaultDependencies(layer, componentName);
    const { fileName: className, template: txtFile } = template(
      componentName,
      ...dependencies
    );

    // só o exemplo debaixo /Users/Document/jsexpert/codegen/src/factory/piratesFactory.js
    const fileName = `${targetFolder}/${lowerCaseFirstLetter(className)}.js`;
    pendingList.push({ fileName, txtFile });
  }

  await executeWrites(pendingList);

  return { success: true };
}
