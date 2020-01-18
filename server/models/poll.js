const mongoose = require('mongoose');

const optionsSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        required: true,
        default: 0
    }
});

const pollSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true 
    },
    author: {
        type: String,
        required: true  
    },
    options: [optionsSchema],
    users: [String]
});


const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;