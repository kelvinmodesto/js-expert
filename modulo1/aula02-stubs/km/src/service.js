class Service {
    async makeRequest(url) {
        return (await fetch(url)).json();
    }

    async getPlanets(url) {
        const data = await this.makeRequest(url);

        return {
            name: data.name,
            appeardIn: data.films.length,
            population: data.population,
        };
    }
}

module.exports = Service;
