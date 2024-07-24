const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors'); 
require('dotenv').config();
const app = express();

connectDB();

app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/folder', require('./routes/folder'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); 
module.exports = app;