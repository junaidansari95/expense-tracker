const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find();
        return res.status(200).json({ success: true, count: expenses.length, data: expenses })
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Server Error' })
    }
});

router.post('/', async (req, res) => {
    try {
        const expense = await Expense.create(req.body);
        return res.status(201).json({ success: true, data: expense })
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ success: false, error: messages })
        } else {
            return res.status(500).json({ success: false, error: 'Server Error' })
        }
    }
});

router.delete('/delete', async (req, res) => {
    try {
        const expense = await Expense.findById(req.query.id);
        if (!expense) {
            return res.status(404).json({ success: false, error: 'Expense not found' });
        }
        await expense.remove();
        return res.status(200).json({ success: true, data: {} })
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Server Error' })
    }
});

router.put('/update', async (req, res) => {
    Expense.findByIdAndUpdate(req.query.id, req.body, { new: true })
        .then(expense => {
            if (!expense) {
                return res.status(404).send({ message: "expense not found with id " + req.query.id });
            }
            res.send(expense);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: "expense not found with id " + req.query.id });
            }
            return res.status(500).send({ message: "Error updating expense with id " + req.query.id });
        });
})

module.exports = router;