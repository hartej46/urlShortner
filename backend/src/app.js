import express from "express"
import cors from "cors"
import connectDB from "./db/index.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json());

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error("Database connection middleware error:", err.message);
        res.status(500).json({
            success: false,
            message: "Database connection failed",
            error: err.message
        });
    }
});

import urlRouter from "./routes/url.router.js";
import healthRouter from "./routes/health.router.js"
import { handleUrlRedirection } from "./controller/Url.controller.js";

app.use('/api/v1', urlRouter);
app.get('/:shortId',handleUrlRedirection )
app.use('',healthRouter, )

export default app;