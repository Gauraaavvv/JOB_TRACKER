import {createJob,getJob,getJobs} from "../service/jobService.js"
import mongoose from "mongoose"

export const createjobController = async (req,res) => {
    const allowedStatus = ["applied", "rejected", "interview", "offer"]
    try {
        const { company, status, salary } = req.body
        if(typeof(company) !== "string"|| company.trim() === "" )
            return res.status(400).json({message: "Invalid company name"})
        if(typeof(status) !== "string" || status.trim() === "" || !allowedStatus.includes(status))
            return res.status(400).json({message: "Invalid status"})
        if( typeof(salary) !== "number" || salary < 0 || !Number.isFinite(salary))
            return res.status(400).json({message: "Invalid Salary"})

        const data = {...req.body,company: company.trim(), status: status.trim()}

        const createdJob = await createJob(data)
        return res.status(201).json(createdJob)        
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}

export const getjobapplicationbyId = async (req,res) => {
    try{
        const id = req.params.id

        if(!mongoose.isObjectIdOrHexString)
            return res.status(400).json({message: "Invalid Id"})

        const job = await getJob(id)
        if(!job)
            return res.status(404).json({message: "No job found"})
        return res.status(200).json(job)
    }catch(err) {
        return res.status(500).json({message: err.message})
    }
}

export const getAllJobs = async (req,res) => {
    try{
        const allJobs =  getJobs()

        if(!allJobs)
            return res.status(404).json({message: "Jobs not found"})
        return res.status(200).json({allJobs})
    }catch(err)
    {
         return res.status(500).json({message: err.message})
    }
}
// export function getApplicationById(applications, id){
//     return applications.find((apl) => apl.id === id)
// }

// export function updateApplication(applications, id, changes){
//     const application = applications.find((apl) => apl.id === id)
//     if(!application)
//         return null;
//     const updatedApplication = {...application,...changes}
//     return updatedApplication
// }

// export function removeApplication(applications,id){
//     const updatedApplication = applications.filter(apl => apl.id !== id)
//     return updatedApplication
// }