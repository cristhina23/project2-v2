const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'My Contacts API documentation',
  },
  host: 'localhost:3000',   
  schemes: ['http'],        
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js', './server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
