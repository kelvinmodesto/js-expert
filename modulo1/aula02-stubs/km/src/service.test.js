const assert = require('assert');
const { createSandbox } = require('sinon');

const Service = require('./service');

const BASE_URL_1 = "https://swapi.dev/api/planets/1/";
const BASE_URL_2 = "https://swapi.dev/api/planets/2/";

const sinon = createSandbox();
const mocks = {
    alderaan: require('../mocks/alderaan.json'),
    tatooine: require('../mocks/tatooine.json'),
};

;(async () => {
    // dealing with a real request
    // const service = new Service();
    // const data = await service.makeRequest(BASE_URL_1);
    // console.log(data);

    const service = new Service();
    const stub = sinon.stub(service, service.makeRequest.name);

    stub.withArgs(BASE_URL_1).resolves(mocks.tatooine);
    stub.withArgs(BASE_URL_2).resolves(mocks.alderaan);

    {
        const expected = {
            name: mocks.tatooine.name,
            appeardIn: mocks.tatooine.films.length,
            population: mocks.tatooine.population,
        };
        const result = await service.getPlanets(BASE_URL_1);
        assert.deepStrictEqual(result, expected);
    }

    {
        const expected = {
            name: mocks.alderaan.name,
            appeardIn: mocks.alderaan.films.length,
            population: mocks.alderaan.population,
        };
        const result = await service.getPlanets(BASE_URL_2);
        assert.deepStrictEqual(result, expected);
    }
})();
