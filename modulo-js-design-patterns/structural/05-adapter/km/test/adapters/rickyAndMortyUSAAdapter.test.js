import { expect, describe, test, jest, beforeEach } from '@jest/globals';
import RickAndMortyUSA from '../../src/business/integrations/rickyAndMortyUSA';
import RickAndMortyUSAAdapter from '../../src/business/adapters/rickyAndMortyUSAAdapter';

describe('#rickAndMortyUSAAdapter suite test', () => {
  beforeEach(() => jest.clearAllMocks());
  test('#getCharacters should be an adapter for .getCharacterFromXML', async () => {
    const usIntegration = jest
      .spyOn(RickAndMortyUSA, RickAndMortyUSA.getCharactersFromXML.name)
      .mockResolvedValue([]);

    const result = await RickAndMortyUSAAdapter.getCharacters();
    expect(result).toStrictEqual([]);
    expect(usIntegration).toHaveBeenCalled();
  });
});
