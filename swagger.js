const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Gaming Session Planner',
    description: 'Use Github login to plan video gaming sessions'
  },
  host: 'cse-341-project-2-2548.onrender.com',
  schemes: ['https'],
  // host: 'localhost:3000',
  // schemes: ['http'],
  securityDefinitions: {
    JWT: {
      type: 'apiKey',
      in: 'cookie',
      name: 'jwt',
      description: 'JWT token stored in cookie'
    }
  },
  // Added JWT to protected routes
  security: [{ JWT: [] }],
  definitions: {
    Game: {
      title: 'string',
      platform: 'string',
      genre: 'string',
      multiplayer: 'string',
      developer: 'string',
      userId: 'string'
    },
    Session: {
      userId: 'string',
      gameId: 'string',
      date: 'string',
      startTime: 'string',
      duration: 'string',
      players: ['string'],
      mode: 'string',
      platform: 'string',
      notes: 'string',
      status: 'string'
    },
    User: {
      username: 'string',
      email: 'string',
      password: 'string'
    },
    Login: {
      email: 'string',
      password: 'string'
    }
  }
};

const outputFile = './swagger.json';
const routes = [
  './routes/index.js',
  './routes/sessions.js',
  './routes/games.js',
  './routes/users.js'
];

swaggerAutogen(outputFile, routes, doc);
