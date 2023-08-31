import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'Flutterwave Bank Management System API',
      version: '1.0.0',
      description: 'API documentation for Flutterwave Bank Management System',
    },
  },
  apis: ['./routes/*.ts'], // Path to my route files
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
