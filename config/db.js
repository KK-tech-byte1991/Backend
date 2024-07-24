const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // await mongoose.connect('mongodb://localhost:27017/form-bot', {
        //     // useNewUrlParser: true,
        //     // useUnifiedTopology: true,
        // });
        // mongodb+srv://kishor:Durva@cluster0.mirndhq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
        await mongoose.connect('mongodb+srv://kishor:Durva@cluster0.mirndhq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/form-bot', {           
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
