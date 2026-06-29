import mongoose from "mongoose";

// Track the connection state globally across serverless hot-reloads
let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log("🔄 Using existing MongoDB connection");
        return;
    }

    // Prevents Mongoose from hanging your serverless functions if the connection blips
    mongoose.set('bufferCommands', false);

    try {
        console.log("⏳ Initiating MongoDB connection...");
        
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            // Drop out fast if the network lags instead of making the user wait 30 seconds
            serverSelectionTimeoutMS: 5000, 
        });
        
        // Check if the primary connection state is open (1)
        if (db.connections[0].readyState === 1) {
            isConnected = true;
            console.log("✅ MongoDB connected successfully!");
        }
    } catch (error) {
        console.error("❌ CRITICAL: MongoDB connection failed:", error.message);
        // Throw the error upwards so your serverless lifecycle knows initialization failed
        throw error; 
    }
};

export default connectDB;