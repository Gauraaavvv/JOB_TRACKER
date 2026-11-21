import Job from "../models/jobModel.js"

export const createJob = async (jobData) => {
    const newJob = await Job.create(jobData);
    
    return newJob;
};

export const getJob = async (jobId) => {
    const job = await Job.findById(jobId)

    return job;
}

export const getJobs= async () => {
    const allJobs = Job.find()

    return allJobs
}                 

export const updateJob = async (id,data) => {
    const updatedJob = await Job.findByIdAndUpdate(
        id,data,
        {
            new: true,
            runValidators: true
        }
    );

    return updatedJob
}

export const deleteJob = async (id) => {
    const deletedJob = await Job.findByIdAndDelete(id)

    return deletedJob
}