import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        // 🟢 FIX 1: Added 'accepted' to this list. 
        enum: ['pending', 'accepted', 'rejected', 'interviewed', 'offered', 'applied'],
        default: 'pending'
    }
}, { timestamps: true }); // 🟢 FIX 2: Changed 'timeseries' to 'timestamps'

export const Application = mongoose.model("Application", applicationSchema);
export default Application;