import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "your-mongodb-connection-string";

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

export default dbConnect;
