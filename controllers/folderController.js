const Folder = require("../models/Folder");

const addFolder = async (req, res, next) => {

    try {
        const { folderName, userId } = req.body;
        let folder = await Folder.findOne({ folderName });
        if (folder) {
            return res.status(400).json({ msg: 'Folder name already exists' });
        }
        if (!folderName || !userId) {
            return res.status(400).send("Please fill all the required fields!!!")
        }

        const newFolder = new Folder({
            folderName, userId
        })

        await newFolder.save();
        res.status(201).json({ msg: 'Folder Created Successfully' })

    } catch (err) {
        next(err)
    }
}

const getFoldersByUserId = async (req, res, next) => {

    const id = req.params.id

    try {
        console.log("userId", id)
        const folders = await Folder.find().and([{ userId: id }]).select('_id folderName')
        res.status(200).send(folders)

    } catch (error) {

    }
}
const deleteFolder = async (req, res, next) => {
    let a = req.params.id
    try {
        await Folder.findByIdAndDelete(a)
        res.status(200).send("Deleted Successfully");
    } catch (error) {

    }
}

module.exports = { addFolder, getFoldersByUserId, deleteFolder }