import { DB_NAME } from "../constant.js";
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: DB_NAME
        });
        console.log("Congrats, db connected");
    } catch (error) {
        console.error("Couldn't connect to DB due to: ", error);
        throw error; // Rethrow to prevent silent failure
    }
}

export default connectDB;