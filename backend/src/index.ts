import mongoose from "mongoose";
import { ApiServer } from "./api/server";

console.log("Connecting to MongoDB...");
await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sumhub');
console.log("Connected to MongoDB");

const apiServer = new ApiServer();
apiServer.listen(3000);