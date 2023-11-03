/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {

  transform: {
    '\\.js?$': 'babel-jest',
  },

  transformIgnorePatterns: ["/node_modules/"],

};

module.exports = config;
