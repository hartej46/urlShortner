import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log("Using existing MongoDB connection");
        return;
    }

    // Force mongoose to throw immediately if not connected
    mongoose.set('bufferCommands', false);

    try {
        // Double check your Vercel Env variable name! 
        // If it's named MONGO_URI or MONGODB_URI in Vercel, make sure it matches here.
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of hanging
        });
        
        if (db.connections[0].readyState === 1) {
            isConnected = true;
            console.log("MongoDB connected successfully!");
        }
    } catch (error) {
        console.error("CRITICAL: MongoDB connection failed:", error.message);
        throw error;
    }
};

export default connectDB;