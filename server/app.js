require('dotenv').config();
const http = require('http');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(logger('dev'));
app.use(cors({ origin: '*' }));

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO, () => console.log('Connect Mongodb'));
    } catch (e) {
        console.log();
    }
}

connect();

app.use('/api', require('./routes/index'));

app.get('*', (req, res) => res.sendFile('index.html', { root: path.resolve(__dirname, 'public') }));

const server = http.createServer(app);
server.listen(port, () => console.log(`Start server in port ${port}...`));
