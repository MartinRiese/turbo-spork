const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: false
    },
    to: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('Transactions', TransactionSchema)