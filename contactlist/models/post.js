const mongoose = require('mongoose');
const fs = require('fs');
const PostSchema = mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        // index: { unique: true, dropDups: true }
    }


});