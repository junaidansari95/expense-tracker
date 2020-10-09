import React from 'react';
import '../App.css';
import { useSelector } from 'react-redux';
import { Box, Typography, Divider } from '@material-ui/core';
import InputForm from './InputForm';
import ExpenseList from './ExpenseList';

export default () => {
    const { expenses } = useSelector(state => state.expenses);
    let total = 0;
    if(undefined !== expenses && expenses.length){
        expenses.forEach(exp => total += exp.amount);
    }
    return (
        <>
            <Box className="header">
                <Typography variant="h3" gutterBottom>MY EXPENSES</Typography>
                <Box style={{ display: 'flex', justifyContent: 'space-around', width: 300, alignItems: 'center' }}>
                    <Typography variant="h4" gutterBottom>Total</Typography>
                    <Divider orientation="vertical" flexItem={true}/>
                    <Typography variant="h3" gutterBottom>{total}</Typography>
                </Box>
            </Box>
            <Divider />
            <Box className="main-container">
                <InputForm />
                <ExpenseList />
            </Box>
        </>
    )
}