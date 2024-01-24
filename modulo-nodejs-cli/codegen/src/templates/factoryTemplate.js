import { upperCaseFirstLetter, lowerCaseFirstLetter } from './../util.js';
const repositoryAnchor = '$$repositoryName';
const serviceAnchor = '$$serviceName';

const repositoryDepAnchor = '$$repositoryDep';
const serviceDepAnchor = '$$serviceDep';

const componentNameAnchor = '$$componentName';

const template = `
import ${repositoryAnchor} from '../repository/${repositoryDepAnchor}.js';
import ${serviceAnchor} from '../service/${serviceDepAnchor}.js';

export default class ${componentNameAnchor}Factory {
  static getInstance() {
    const repository = new ${repositoryAnchor}();
    const service = new ${serviceAnchor}({ repository });
    return service;
  }
}`;

export function factoryTemplate(componentName, repositoryName, serviceName) {
  const currentContext = `this.${repositoryName}`;
  const txtFile = template
    .replaceAll(componentNameAnchor, upperCaseFirstLetter(componentName))
    .replaceAll(repositoryAnchor, upperCaseFirstLetter(repositoryName))
    .replaceAll(serviceAnchor, upperCaseFirstLetter(serviceName))
    .replaceAll(repositoryDepAnchor, lowerCaseFirstLetter(repositoryName))
    .replaceAll(serviceDepAnchor, lowerCaseFirstLetter(serviceName));
  return {
    fileName: `${componentName}Factory`,
    template: txtFile,
  };
}
