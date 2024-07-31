const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
// const transformIdMiddleware = require('./transformIdMiddleware');
const app = express();
const { authMiddleware } = require("./controllers/authController")
connectDB();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(transformIdMiddleware);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/folder', authMiddleware, require('./routes/folder'));
app.use("/api/typebot", authMiddleware, require("./routes/typebot"))
app.use("/api/public", require("./routes/public"))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
module.exports = app;