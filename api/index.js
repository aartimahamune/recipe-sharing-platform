import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
mongoose.connect(process.env.MONGO)

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

const app = express();
const PORT = 3000;

app.get('/', (req, res)=>{
    res.send("<h1>Hello World!</h1>");
})

app.listen(PORT , ()=>{
    console.log(`Server is listening on port ${PORT}`);
    
})