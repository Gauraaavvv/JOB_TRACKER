import mongoose from "mongoose"


const jobSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    company: {
        type: String,
        required: true,
        trim: true
    },

    status: {
        type: String,
        required: true,
        enum: ["applied", "rejected", "interview", "offer"]
    },

    salary: {
        type: Number,
        required: true,
        min: 0
    },

    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Job = mongoose.model("Job", jobSchema);

export default Job;