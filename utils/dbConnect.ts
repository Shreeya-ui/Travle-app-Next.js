import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

const dbConnect = async () => {
  if (!MONGO_URI) {
    console.error("❌ MONGO_URI is not defined.");
    throw new Error("MONGO_URI is not defined in environment variables.");
  }

  if (mongoose.connection.readyState >= 1) {
    console.log("✅ Using existing MongoDB connection.");
    return;
  }

  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI, {
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 30000,
      bufferCommands: false,
    });
    console.log("✅ Successfully connected to MongoDB.");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw new Error("MongoDB Connection Failed");
  }
};

export default dbConnect;
