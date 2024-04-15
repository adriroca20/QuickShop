import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken'

const port = process.env.PORT || 5000;
connectDB();
const app = express();
//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//cookie parser middleware
app.use(cookieParser());
//cors middleware
app.use(cors({
    origin: 'http://localhost:5173',
}));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/api', (req, res) => {
    res.send('API is running');
});

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});