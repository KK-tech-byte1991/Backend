const Typebot = require("../models/typebot");
const { Element } = require("../models/element")

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
        console.log("updatepayload", id, req.body);
        const result = await Typebot.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ msg: 'Form Updated Successfully.' })
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const deleteByElementId = async (req, res, next) => {


    try {
        const elementId = req.params.id;

        const result = await Typebot.updateMany(
            { "flow._id": elementId },
            { $pull: { flow: { _id: elementId } } }
        );
        console.log(result)
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error removing element' });
    }

}
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
const deleteTypeBot = async (req, res, next) => {
    let a = req.params.id
    console.log(a,"deletee")
    try {
        await Typebot.findByIdAndDelete(a)
        res.status(200).send("Deleted Successfully");
    } catch (error) {

    }
   
}

module.exports = { addtypebot, deleteTypeBot, deleteByElementId, gettypebotByFolderId, gettypebotByUserId, gettypebotById, updateById }