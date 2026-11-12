import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./src/config/db.js"
import {createjobController,getjobapplicationbyId,getAllJobs} from "./src/controllers/jobController.js"

dotenv.config();

const app = express()
const PORT = 3000


app.use(express.json())


app.post("/jobs",createjobController)

app.get("/",(req , res) => { 
    res.send("Job Application Tracker API is running")
})

app.get("/jobs" , getAllJobs)

app.get("/jobs/:id", getjobapplicationbyId)

app.patch("/jobs/:id", (req, res) => {  
    const id = Number(req.params.id)
    if( !Number.isInteger(id) || id <= 0 ) 
        return res.status(400).json({message: "Invalid id"})

    if(req.body === null || typeof req.body !== "object" || Array.isArray(req.body))
        return res.status(400).json({message: "Invalid request body"})

    if (Object.keys(req.body).length === 0) 
        return res.status(400).json({message: "No fields provided for update"})

    const allowedFields = ["company", "status", "salary"]  
    const invalidFields = Object.keys(req.body).some((fl) => !allowedFields.includes(fl))
    if(invalidFields) return res.status(400).json({message: "Invalid fields"})
    const allowedStatus = ["applied", "rejected", "interview", "offer"]
    const hasInvalidValues = Object.entries(req.body).some(([field, value]) => {
            if(field === "status") 
                return !allowedStatus.includes(value)
            if(field === "company")
                return typeof value != "string" || value.trim() === ""
            if(field === "salary")
                return typeof value !== "number" || !Number.isFinite(value) || value < 0
            return false
    })
    if(hasInvalidValues)
        return res.status(400).json({message: "Invalid entries"})
    const changes = req.body
    const updatedApplication = updateApplication(applications, id, changes)
    if(!updatedApplication)
        return res.status(404).json({message: "No application found"})
    res.status(200).json(updatedApplication)
})

app.delete("/jobs/:id", (req, res) => {
    const id = Number(req.params.id)
    if(!Number.isInteger(id) || id <= 0)
        return res.status(400).json({message: "Invalid id"})
    
    const removedApplication = removeApplication(applications, id)
    if( removedApplication.length === applications.length) 
        return res.status(404).json({message: "Application not found"})

    applications.splice(0,applications.length,...removedApplication)
    console.log(applications)
    return res.status(200).json({message: "Application deleted",applications})
})


const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
        console.log(`Server is listenig at http://localhost:${PORT}`)
        })
    }  catch(err) {
        console.log("Failed to start server: ", err.message);
        process.exit(1);
    }
}

startServer()