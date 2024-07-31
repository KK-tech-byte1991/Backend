const Typebot = require("../models/typebot");

const addtypebot = async (req, res, next) => {

    try {
        const { folderId, userId, flow, theme, formName } = req.body;

        const newtypebot = new Typebot({
            folderId, userId, flow, theme, formName
        })

        let a = await newtypebot.save();
        console.log(a, "a")
        res.status(201).send(a)

    } catch (err) {
        next(err)
    }
}
const updateById = async (req, res, next) => {
    try {
        const { id } = req.body;
        console.log("updatepayload",id,req.body)
        // let updatedPayload={folderId,userId,flow}
        const result = await Typebot.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ msg: 'Form Updated Successfully.' })
    } catch (error) {
        console.error(error);
        throw error;
    }
};
const gettypebotByUserId = async (req, res, next) => {

    const id = req.params.id

    try {
        console.log("userId", id)
        const typebots = await Typebot.find().and([{ userId: id }])
        console.log("folders", typebots)
        res.status(200).send(typebots)


    } catch (error) {

    }
}

const gettypebotByFolderId = async (req, res, next) => {

    const id = req.params.id

    try {
        console.log("userId", id)
        const typebots = await Typebot.find().and([{ folderId: id }])
        console.log("folders", typebots)
        res.status(200).send(typebots)


    } catch (error) {

    }
}
const gettypebotById = async (req, res, next) => {

    const id = req.params.id

    try {
        console.log("userId", id)
        const typebot = await Typebot.findById(id)
        console.log("folders", typebot)
        res.status(200).send(typebot)


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

module.exports = { addtypebot, deleteFolder, gettypebotByFolderId, gettypebotByUserId, gettypebotById,updateById }