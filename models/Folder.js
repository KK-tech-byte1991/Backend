const mongoose = require('mongoose');


const FolderSchema = new mongoose.Schema({
    folderName: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    }

});



module.exports = mongoose.model("Folders", FolderSchema);
