import Job from "../models/jobModel.js"

export const createJob = async (jobData) => {
    const newJob = await Job.create(jobData);

    return newJob;
};

export const getJob = async (jobId, userId) => {
    const job = await Job.findOne({ _id: jobId, user: userId })

    return job;
}

export const getJobs = async (userId) => {
    const allJobs = Job.find({ user: userId })

    return allJobs
}

export const updateJob = async (jobId, userId, data) => {
    const updatedJob = await Job.findOneAndUpdate(
        { _id: jobId, user: userId },
        data,
        {
            new: true,
            runValidators: true
        }
    );

    return updatedJob
}

export const deleteJob = async (jobId, userId) => {
    const deletedJob = await Job.findOneAndDelete({ _id: jobId, user: userId })

    return deletedJob
}

export const countByStatus = async (status) => {
    const statusCount = await job.countDocuments({ status: status })

    return statusCount;
}