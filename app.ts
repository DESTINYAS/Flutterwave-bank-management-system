import express from 'express';
import swaggerUi from 'swagger-ui-express';
import setupSwagger from './swagger'; // Import the setupSwagger function
import postAccountRoutes from './routes/post';
import getAccountRoutes from './routes/get';
const app = express();

app.use(express.json())

// Serve Swagger UI
app.use('/api', swaggerUi.serve, swaggerUi.setup(setupSwagger));

// Use the imported routes
app.use('/accounts', postAccountRoutes);
app.use('/', getAccountRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
