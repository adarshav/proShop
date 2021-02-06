import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import { notFound, errorHandle } from './middleware/errorMiddleware.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

connectDB();

const app = express();

// allows to post the data of JSON type
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is Running on port 5000');
});

// the GET routes are moved to productRoutes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// the code has be moved to middleware folder for good look.
// Handling 404 code
app.use(notFound);
// custom error handling
app.use(errorHandle);

// this is done with the help of dotenv module. Y dotenv module is used because we can push our environment variables here in .env file and now PORT is of the same.
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
