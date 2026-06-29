import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        console.log("🔄 Using existing MongoDB connection");
        return;
    }

    mongoose.set('bufferCommands', false);

    try {
        console.log("⏳ Initiating MongoDB connection...");
        
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000, 
        });
        
        console.log("✅ MongoDB connected successfully!");
    } catch (error) {
        console.error("❌ CRITICAL: MongoDB connection failed:", error.message);
        throw error; 
    }
};

export default connectDB;