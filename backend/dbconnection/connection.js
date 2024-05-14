import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECTION);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error; // Throw the error for the calling code to handle
    }
};

const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB...");
    } catch (error) {
        console.error("Failed to disconnect from MongoDB:", error);
        throw error; // Throw the error for the calling code to handle
    }
};

export { connectDB, disconnectDB };
