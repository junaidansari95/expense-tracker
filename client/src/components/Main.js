import React from 'react';
import '../App.css';
import { useSelector } from 'react-redux';
import { Box, Typography, CircularProgress, Divider } from '@material-ui/core';
import InputForm from './InputForm';
import ExpenseList from './ExpenseList';

export default () => {
    const { expenses, isGetExpenseRequestLoading, isPostRequestLoading, isUpdateRequestLoading, isDeleteRequestLoading } = useSelector(state => state.expenses);
    let total = 0;
    if(undefined !== expenses && expenses.length){
        expenses.forEach(exp => total += exp.amount);
    }
    if(isGetExpenseRequestLoading || isPostRequestLoading || isUpdateRequestLoading || isDeleteRequestLoading)
        return(<Box style={{ display: 'flex', justifyContent: 'center', paddingTop: '25%' }}>
                    <CircularProgress size={70} />
                </Box>)
    else
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