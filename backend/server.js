import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./src/config/db.js"
import express from "express"
import authRoutes from "./src/routes/authRoutes.js"
import jobRoutes from "./src/routes/jobRoutes.js"

dotenv.config();

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use("/jobs", jobRoutes)
app.use("/auth", authRoutes)

const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Server is listenig at http://localhost:${PORT}`)
        })
    } catch (err) {
        console.log("Failed to start server: ", err.message);
        process.exit(1);
    }
}

startServer()