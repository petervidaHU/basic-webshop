import express from 'express';
import dotenv from 'dotenv';
import app from './server.js';
import connectDB from './db.js';
/* import path, { dirname } from 'path';
import { fileURLToPath } from 'url'; 
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use('/public', express.static(path.join(__dirname + '/images'))); */

dotenv.config();
connectDB();

const PORT = process.env.PORT // || 3000;

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});
