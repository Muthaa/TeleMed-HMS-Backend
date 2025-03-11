const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Healthcare API',
      version: '1.0.0',
      description: 'API Documentation for Patient Management',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Change to your API URL
      },
    ],
  },
  apis: ['./routes/*.js', './controllers/*.js'], // Document routes & controllers
};

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger Docs available at http://localhost:3000/api-docs');
};

module.exports = swaggerDocs;
