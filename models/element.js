const mongoose = require('mongoose');
const elementSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,

    },
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,

    },
    code:{
        type:String,
        required:true
    }
})
const Element = mongoose.model('Element', elementSchema);

module.exports = { elementSchema, Element };