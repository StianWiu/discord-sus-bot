const express = require('express')
const app = express()

// Set up body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Set up cors
const cors = require('cors');
app.use(cors());

// Set up compression
const compression = require('compression');
app.use(compression());

const user = require('./routes/user.js')
app.use('/api/user', user)

module.exports = app