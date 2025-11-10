import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.log("Failed to connect to MongoDB", error);
    }
}

export default connectDB;