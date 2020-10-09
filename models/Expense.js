const mongoose = require('mongoose');
const ExpenseSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    amount: {
        type: Number,
    },
    note: {
        type: String,
    },
    exp_date: {
        type: String,
    }
});

module.exports = mongoose.model('Expense', ExpenseSchema);