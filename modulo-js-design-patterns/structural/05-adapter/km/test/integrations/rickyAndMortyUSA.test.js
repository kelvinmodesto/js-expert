import { expect, describe, test, jest, beforeEach } from '@jest/globals';
import axios from 'axios';
import fs from 'fs/promises';
import Character from '../../src/entities/character';
import RickAndMortyUSA from '../../src/business/integrations/rickyAndMortyUSA';

describe('#rickAndMortyUSA suite test', () => {
  beforeEach(() => jest.clearAllMocks());
  test('#getCharactersFromXML should return a list of Characters', async () => {
    const response = await fs.readFile('./test/mocks/characters.xml');
    const expected = [
      {
        gender: 'Male',
        id: 10,
        location: "Worldender's lair",
        name: 'Alan Rails',
        origin: 'unknown',
        species: 'Human',
        status: 'Dead',
        type: 'Superhuman (Ghost trains summoner)',
      },
    ];

    jest.spyOn(axios, 'get').mockResolvedValue({ data: response });

    const result = await RickAndMortyUSA.getCharactersFromXML();

    expect(result).toMatchObject(expected);
  });
  test('#getCharactersFromXML should return an empty list', async () => {
    const response = await fs.readFile('./test/mocks/characters-empty.xml');
    const expected = [];

    jest.spyOn(axios, 'get').mockResolvedValue({ data: response });

    const result = await RickAndMortyUSA.getCharactersFromXML();

    expect(result).toMatchObject(expected);
  });
});
