const { Schema, model } = require('mongoose');

const schema = new Schema({
    begin: { type: String, required: true },
    end: { type: String, required: true },
    answersTrue: { type: Number, required: true },
    answersFalse: { type: Number, required: true },
    count: { type: Number, required: true },
});

module.exports = model('result', schema);
