import { DB_NAME } from "../constant.js";
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("COngrats, db connected");
    } catch (error) {
        console.log("Couldn't connect to DB due to: ", error);
    }
}

export default connectDB;