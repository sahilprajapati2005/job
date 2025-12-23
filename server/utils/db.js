import mongoose from "mongoose";

const connectDB = async () => {
    // Check if we are already connected to avoid reconnecting
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb is connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        throw error; // Throw error so the calling function knows it failed
    }
}

export default connectDB;