const mongoose = require('mongoose');

const elementResponse = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    value: {
        type: String,
        required: true
    },
})
const responseSchema = new mongoose.Schema({

    formId: {
        type: String,
        required: true
    },

    submittedAt: {
        type: String,
        required: true

    },
    elementResponse:[elementResponse]
})
const ResponseModel = mongoose.model('ResponseModel', responseSchema);
module.exports = ResponseModel;

