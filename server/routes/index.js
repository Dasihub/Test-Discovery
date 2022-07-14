const express = require('express');

const app = express();

app.use('/auth', require('./authRoute'));
app.use('/result', require('./resultRoute'));

module.exports = app;
