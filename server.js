const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('database.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;
const cors = require('cors');

const whitelist = [
    'http://localhost:3000',
    'https://thejmdw.com',
    'https://www.thejdmw.com'
]

const corsOrigin = (origin, callback) => {
    let originISWhitelisted = whitelist.indexOf(origin) !== -1
    callback(null, originIsWhitelisted)
}

server.use(
    cors({
        // origin: true,
        origin: corsOrigin(),
        credentials: true,
        preflightContinue: false,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    })
);
server.options('*', cors());

server.use(middlewares);
server.use(router);

server.listen(port);
