import { upperCaseFirstLetter } from './../util.js';
const componentNameAnchor = '$$componentNameAnchor';

const template = `
export default class ${componentNameAnchor}Repository {
  constructor() { }

  create(data) {
    return new Promise.reject('method not implemented')
  }

  read(query) {
    return new Promise.reject('method not implemented')
  }

  update(id, data) {
    return new Promise.reject('method not implemented')
  }

  delete(id) {
    return new Promise.reject('method not implemented')     
  }
  
}`;

export function repositoryTemplate(componentName) {
  return {
    fileName: `${componentName}Repository`,
    template: template.replaceAll(
      componentNameAnchor,
      upperCaseFirstLetter(componentName)
    ),
  };
}
