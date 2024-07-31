const mongoose = require('mongoose');

const element = new mongoose.Schema({
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
       
    }
})

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
    flow: [element],
    formName: {
        type: String,
        required: true
    }

});



module.exports = mongoose.model("typebot", typebotSchema);
