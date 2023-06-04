const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const connectDB = require('./database');

// middleware
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes

app.get('/health-api', (req, res) => {
    res.send('Server is up and running');
})

// Connect to MongoDB
connectDB();

// start server
app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));