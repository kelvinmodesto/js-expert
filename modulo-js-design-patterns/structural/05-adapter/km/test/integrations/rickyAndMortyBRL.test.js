import { expect, describe, test, jest, beforeEach } from '@jest/globals';
import axios from 'axios';
import fs from 'fs/promises';
import Character from '../../src/entities/character';
import RickAndMortyBRL from '../../src/business/integrations/rickyAndMortyBRL';
describe('#rickAndMortyBRL suite test', () => {
  beforeEach(() => jest.clearAllMocks());
  test('#getCharactersFromJson should return a list of Characters', async () => {
    const response = JSON.parse(
      await fs.readFile('./test/mocks/characters.json')
    );
    const expected = response.results.map((char) => new Character(char));

    jest.spyOn(axios, 'get').mockResolvedValue({ data: response });

    const result = await RickAndMortyBRL.getCharactersFromJSON();
    expect(result).toStrictEqual(expected);
  });
  test('#getCharactersFromJson should return an empty list', async () => {
    const response = JSON.parse(
      await fs.readFile('./test/mocks/characters-empty.json')
    );
    const expected = response.results;

    jest.spyOn(axios, 'get').mockResolvedValue({ data: response });

    const result = await RickAndMortyBRL.getCharactersFromJSON();
    expect(result).toStrictEqual(expected);
  });
});
