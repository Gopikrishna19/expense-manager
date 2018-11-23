const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    category: String,
    date: Number,
    reason: String,
    type: String
});

module.exports.Entry = mongoose.model('Entry', entrySchema);
