
const ResponseModel = require("../models/responses")

// const addResponse = async (req, res, next) => {

//     try {
//         const { formId, elementResponse } = req.body;
//         const submittedAt = new Date()
//         const newResponse = new ResponseModel({
//             formId, submittedAt, elementResponse
//         })

//         let a = await newResponse.save();
//         console.log(a, "a")
//         res.status(201).send(a)

//     } catch (err) {
//         next(err)
//     }
// }


// module.exports = { addResponse }


const addResponse = async (req, res, next) => {
    try {
        const { formId, elementResponse } = req.body;
        const submittedAt = new Date();

        // Validate data here (e.g., using Joi or express-validator)

        const newResponse = new ResponseModel({ formId, submittedAt, elementResponse });
        console.log(newResponse, "a");
        let a = await newResponse.save()
        // Send only necessary fields or a success message
        res.status(201).send(a);

    } catch (err) {
        console.error(err); // Log the error
        next(err);
    }
};
const addElementToArray = async (req, res, next) => {
    const { id } = req.params.id
    try {
        const { element } = req.body;
        console.log("eleemmmmm", element)
        const response = await ResponseModel.findOneAndUpdate(
            { id },
            { $push: { elementResponse: element } },
            { new: true }
        );
        res.status(200).send(response);
    } catch (err) {
        next(err);
    }
};

const getResponsesByFormId = async (req, res, next) => {

    const id = req.params.id

    try {
        console.log("userId", id)
        const response = await ResponseModel.find().and([{ formId: id }])
        console.log("response", response)
        res.status(200).send(response)


    } catch (error) {

    }
}

module.exports = { addResponse, addElementToArray ,getResponsesByFormId};