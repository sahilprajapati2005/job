import mongoose from "mongoose";
const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
    },
    website:{
        type: String,
    },
    logo:{
        type: String
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    }

}
,{
    timeseries: true,
});
const Company = mongoose.model('Company', companySchema);
export default Company;
