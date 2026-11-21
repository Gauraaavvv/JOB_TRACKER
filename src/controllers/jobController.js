import {createJob,getJob,getJobs,updateJob,deleteJob} from "../service/jobService.js"
import mongoose from "mongoose"

export const createjobController = async (req,res) => {
    const allowedStatus = ["applied", "rejected", "interview", "offer"]
    try {
        const { company, status, salary } = req.body
        if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) 
            return res.status(400).json({ message: "Invalid body" });
        if(typeof(company) !== "string"|| company.trim() === "" )
            return res.status(400).json({message: "Invalid company name"})
        if(typeof(status) !== "string" || status.trim() === "" || !allowedStatus.includes(status.trim()))
            return res.status(400).json({message: "Invalid status"})
        if( typeof(salary) !== "number" || salary < 0 || !Number.isFinite(salary))
            return res.status(400).json({message: "Invalid Salary"})

        const data = {company: company.trim(), status: status.trim(), salary}

        const createdJob = await createJob(data)
        return res.status(201).json(createdJob)        
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}

export const getjobapplicationbyId = async (req,res) => {
    try{
        const id = req.params.id

        if(!mongoose.isObjectIdOrHexString(id))
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
        const allJobs =  await getJobs()


        return res.status(200).json({
            count: allJobs.length,
            jobs: allJobs
        })
    }catch(err)
    {
         return res.status(500).json({message: err.message})
    }
}

export const updateJobController = async (req,res) => {
    try{
        const id = req.params.id
        if(!mongoose.isObjectIdOrHexString(id))
            return res.status(400).json({message: "Invalid Id"})
        if(req.body === null || typeof req.body !== "object" || Array.isArray(req.body))
            return res.status(400).json({message: "Invalid body"})
        if(Object.keys(req.body).length === 0)
            return res.status(400).json({message: "No fields provided for update"})
        const allowedFields = ["company", "status", "salary"]  
        const allowedStatus = ["applied", "rejected", "interview", "offer"]
        if(Object.keys(req.body).some((fl) => !allowedFields.includes(fl)))
            return res.status(400).json({message: "Invalid fields"})
        if (Object.entries(req.body).some(([fl, value] )=> {
            if(fl === "status")
                return typeof value !== "string" || !allowedStatus.includes(value.trim());
            if(fl === "company")
                return typeof value !== "string" || value.trim() === "" 
            if(fl === "salary") 
                return typeof value !== "number" || !Number.isFinite(value) || value < 0 
            return false 
        })) 
        return res.status(400).json({message: "Invalid values"})

        const updates = { ...req.body };
        if (updates.company !== undefined )
            updates.company = updates.company.trim();
        if (updates.status !== undefined) {
            updates.status = updates.status.trim();
        }
        const updatedJob = await updateJob(id,updates)
        if(!updatedJob)
            return res.status(404).json({message: "No job found to update"})
        return res.status(200).json(updatedJob)
        }catch(err)
        {
            return res.status(500).json({message: err.message})
        }
}

export const deleteJobController = async (req,res) => {
    const id = req.params.id
    try{if(!mongoose.isObjectIdOrHexString(id))
        {return res.status(400).json({message: "Invalid Id"})}

    const deletedJob = await deleteJob(id)
    if(!deletedJob)
        return res.status(404).json({message: "Job not found"})

    return res.status(200).json({message: "Job deleted successfully",deletedJob})
     }catch(err)
     {
            return res.status(500).json({message: "Server error",err: err.message})
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
// 