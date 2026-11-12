import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connection succesful")
    }catch(err){
        console.error("MongoDB connection failed:", err.message)
        throw err;
    }
}

