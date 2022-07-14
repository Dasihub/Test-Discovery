const express = require('express');

const app = express();

app.use('/auth', require('./authRoute'));

module.exports = app;
