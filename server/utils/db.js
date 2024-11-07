import mongoose from "mongoose";
import 'dotenv/config';

export default async function connectDb(){
    try {
        const db = await mongoose.connect(process.env.MONGO_URL);
        console.log("Database is successfully connected.");
    } catch (error) {
        console.log(error);
    }
}