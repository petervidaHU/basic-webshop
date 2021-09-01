import express from 'express';
import { error404, errorHandler } from './middlewares/errorHandlerMiddleware.js';
import categoryRoutes from './routes/categoryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import imageRoutes from './routes/imageRoutes.js'; 
import addressRoutes from './routes/addressRoutes.js'; 
import fileupload from 'express-fileupload';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url'; 
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use('/public', express.static(path.join(__dirname + '/images'))); 

app.use(express.json())
app.use(fileupload());

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/images',imageRoutes)
app.use('/api/address',addressRoutes)

app.use(error404)
app.use(errorHandler)

export default app;