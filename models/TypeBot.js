const mongoose = require('mongoose');
const {elementSchema} = require("./element")

const typebotSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    folderId: {
        type: String,
    },
    theme: {
        type: String,
        required: true
    },
    flow: [elementSchema],
    formName: {
        type: String,
        required: true
    }

});



module.exports = mongoose.model("typebot", typebotSchema);
