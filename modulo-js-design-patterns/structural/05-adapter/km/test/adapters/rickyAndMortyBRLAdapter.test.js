import { expect, describe, test, jest, beforeEach } from '@jest/globals';
import RickAndMortyBRL from '../../src/business/integrations/rickyAndMortyBRL';
import RickAndMortyBRLAdapter from '../../src/business/adapters/rickyAndMortyBRLAdapter';
describe('#rickAndMortyBRLAdapter suite test', () => {
  beforeEach(() => jest.clearAllMocks());
  test('#getCharacters should be an adapter for .getCharacterFromJSON', async () => {
    const brlIntegration = jest
      .spyOn(RickAndMortyBRL, RickAndMortyBRL.getCharactersFromJSON.name)
      .mockResolvedValue([]);

    const result = await RickAndMortyBRLAdapter.getCharacters();
    expect(result).toStrictEqual([]);
    expect(brlIntegration).toHaveBeenCalled();
  });
});
