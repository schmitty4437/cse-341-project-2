const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Gaming Session Planner',
    description: 'Plan video gaming sessions'
  },
  host: 'cse-341-project-2-2548.onrender.com',
  schemes: ['https']
  // host: 'localhost:3000',
  // schemes: ['http']
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js', './routes/sessions.js', './routes/games.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
