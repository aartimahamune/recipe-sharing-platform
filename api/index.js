import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from '../api/routes/user.route.js';
import authRouter from '../api/routes/auth.route.js';
import cors from 'cors';
import cookieParser from "cookie-parser";
import recipeRouter from '../api/routes/recipe.route.js'
import { v2 as cloudinary } from 'cloudinary';
import commentRoutes from '../api/routes/Comment.route.js'

dotenv.config();
mongoose.connect(process.env.MONGO)

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,
}));
app.use(cookieParser());

app.listen(PORT , ()=>{
    console.log(`Server is listening on port ${PORT}`);
    
})


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/recipe', recipeRouter);
app.use('/api/comment', commentRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});