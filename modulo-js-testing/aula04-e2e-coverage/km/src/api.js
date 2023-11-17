const http = require('http');
const { once } = require('events');
const DEFAULT_USER = {
    username: 'KelvinModesto',
    password: '123'
}

const routes = {
    '/contact': (request, response) => {
        response.write('contact us');
        return response.end();
    },
    // curl -i -X POST --data '{"username": "kelvinmodesto","password": "23"}' localhost:3000/login
    // curl -i -X POST --data '{"username": "Kelvinmodesto","password": "123"}' localhost:3000/login
    '/login': async (request, response) => {
        const user = JSON.parse(await once(request, 'data'));

        if (user.username.toLowerCase() !== DEFAULT_USER.username.toLowerCase()
            || user.password !== DEFAULT_USER.password
        ) {
            response.writeHead(401);
            response.end('log in failed');
            return;
        }
        return response.end('log in succeeded');
    },
    default(request, response) {
        response.writeHead(404);
        return response.end('not found!');
    }
}

function handler(request, response) {
    const { url } = request;
    const chosen = routes[url.toLowerCase()] || routes.default;
    return chosen(request, response);
}

const app = http.createServer(handler)
    .listen(3000, () => console.log('Listening at 3000...'));

module.exports = app;
