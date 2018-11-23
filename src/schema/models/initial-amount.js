const mongoose = require('mongoose');

const initialAmountSchema = new mongoose.Schema({
    amount: Number
});

module.exports.InitialAmount = mongoose.model('InitialAmount', initialAmountSchema);
