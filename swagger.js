const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'My Contacts API documentation',
  },
  host: 'project2-v2.onrender.com',   
  schemes: ['https'],        
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js', './server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
