import dotenv from "dotenv";

dotenv.config({
    path:'./env'
})

import client from "./db/redis";
import connectDB from "./db";
import app from './app.js'

const startServer = async () => {
    try {
        await connectDB();
        console.log("MongoDB connected successfully!");
        client.on('error', err => console.error('Redis Client Error:', err));
        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log(`Server is running smoothly at port : ${PORT}`);
        });

    } catch (error) {
        console.error("Server initialization failed:", error);
        process.exit(1);
    }
};

startServer();
