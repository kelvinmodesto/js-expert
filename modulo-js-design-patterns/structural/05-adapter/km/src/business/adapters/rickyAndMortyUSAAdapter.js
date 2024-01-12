import RickAndMortyUSA from '../integrations/rickyAndMortyUSA.js';

export default class RickAndMortyUSAAdapter {
  static async getCharacters() {
    return RickAndMortyUSA.getCharactersFromXML();
  }
}
