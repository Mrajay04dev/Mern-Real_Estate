import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routes/userroute.js'
import authRouter from './routes/authroute.js'
dotenv.config();

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("Connected To Mongo Successfully");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

const app = express();
app.use(express.json());
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port} `);
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'internal server error'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
});


