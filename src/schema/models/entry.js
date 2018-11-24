const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    amount: Number,
    category: String,
    date: Date,
    reason: String,
    type: String
});

module.exports.Entry = mongoose.model('Entry', entrySchema);
