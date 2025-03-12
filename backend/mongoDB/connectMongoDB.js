import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB: ", connection.connection.host);
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "Unknown error";
        console.log("Error connecting to MongoDB: ", errorMessage);
        process.exit(1);
    }
}

export default connectMongoDB