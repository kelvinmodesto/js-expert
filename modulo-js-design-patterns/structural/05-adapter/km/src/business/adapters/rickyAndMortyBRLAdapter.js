import RickAndMortyBRL from '../integrations/rickyAndMortyBRL.js';

export default class RickAndMortyBRLAdapter {
  static async getCharacters() {
    return RickAndMortyBRL.getCharactersFromJSON();
  }
}
