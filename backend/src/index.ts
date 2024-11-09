import mongoose from "mongoose";
import { ApiServer } from "./api/server";

// Initializing this first will validate the environment variables and 
// throw an error if they are not set
const apiServer = new ApiServer();

console.log("Connecting to MongoDB...");
await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sumhub');
console.log("Connected to MongoDB");

apiServer.listen(3000);