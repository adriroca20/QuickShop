import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config({path:"../.env",});

const connectDB = async () => {
  
  try {
    const mongo_uri = process.env.MONGO_URI;
    const conn = await mongoose.connect(mongo_uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;