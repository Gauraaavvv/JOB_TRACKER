import express from "express";
import { applications, filterApplications, updateApplication, getApplicationById } from "./js_01.js"

const app = express()
const PORT = 3000

app.use(express.json())

app.post("/jobs", (req, res) => {
    const  application  = req.body
    const newApplication = {id: Date.now(), ...application}
    applications.push(newApplication)
    res.status(201).json({newApplication})
})

app.get("/",(req , res) => {
    res.send("Job Application Tracker API is running")
})

app.get("/jobs" , (req , res) => {
    res.json(applications)
})

app.get("/jobs/:id", (req, res) => {
    const id = Number(req.params.id);

    if(!Number.isInteger(id) || id <= 0)
        return res.status(400).json(
            {message: "Invalid job ID"}
        )
    
    const job = getApplicationById(applications, id)

    if(!job){
        return res.status(404).json(
            { message : "Job application not found"}
        )
    }
    return res.status(200).json(job)
})

app.patch("/jobs/:id", (req, res) => {
    const id = Number(req.params.id)
    if( !Number.isInteger(id) || id <= 0 )
        return res.status(400).json({message: "Invalid id"})

    const changes  = req.body
    console.log("ID:", id);
    console.log("Changes received:", changes);
    const updatedApplication = updateApplication(applications, id, changes)
    console.log(applications)
    res.status(200).json(updatedApplication)
})
app.listen(PORT, () => {
    console.log(`Server is listenig at http://localhost:${PORT}`)
})