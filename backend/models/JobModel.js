const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({  
    companyName: {
        type: String,
        required: true,
    },
    logoURL: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        required: true,
    },
    Remote: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    aboutCompany: {
        type: String,
        required: true,
    },
    Skills: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }

});
const Job = mongoose.model('job', JobSchema);
module.exports = Job;



