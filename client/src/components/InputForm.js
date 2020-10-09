import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button, Box, InputAdornment } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { createExpenses } from '../Action/expenseAction';
const useStyles = makeStyles({
    formContainer: {
        maxWidth: 450,
        padding: 12,
        margin:'0 auto',
    },
    // submit: {
    //     margin: theme.spacing(3, 0, 2),
    // }
});
const schema = yup.object().shape({
    title: yup.string().required("Required"),
    amount: yup.number().required("Required"),
    note: yup.string().required("Required"),
});
export default () => {
    const dispatch = useDispatch();
    console.error = () => { };
    const [expDate, setExpDate] = useState(new Date());
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });
    const handleCreteExpense = (data, event) => {
        event.preventDefault();
        data.exp_date = expDate;
        dispatch(createExpenses(data));
        // console.log("FORM DATA: ",data);
    }
    const classes = useStyles();

    return (
        <Box className={classes.formContainer}>
            <form noValidate onSubmit={handleSubmit(handleCreteExpense)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            inputRef={register({ required: true, maxLength: 20 })}
                            fullWidth
                            id="title"
                            label="Title"
                            name="title"
                            autoComplete="title"
                            autoFocus
                        />
                        {errors.title && (<p style={{ color: "#f44336" }}>{errors.title.message}</p>)}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            inputRef={register({ required: true })}
                            fullWidth
                            id="amount"
                            label="Amount"
                            name="amount"
                            autoComplete="amount"
                            autoFocus
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">₹</InputAdornment>
                                ),
                              }}
                        />
                        {errors.amount && (<p style={{ color: "#f44336" }}>{errors.amount.message}</p>)}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            inputRef={register({ required: true, maxLength: 50 })}
                            fullWidth
                            id="note"
                            label="Note"
                            name="note"
                            autoComplete="note"
                            autoFocus
                        />
                        {errors.note && (<p style={{ color: "#f44336" }}>{errors.note.message}</p>)}
                    </Grid>
                    <Grid item xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                disableFuture
                                variant="inline"
                                inputVariant="outlined"
                                margin="normal"
                                // inputRef={register({ required: true })}
                                fullWidth
                                id="date"
                                label="Date"
                                name="date"
                                autoComplete="date"
                                autoFocus
                                openTo="date"
                                views={["year", "month", "date"]}
                                value={expDate}
                                onChange={(newValue) => setExpDate(newValue)}
                                renderInput={(props) => <TextField {...props} />}
                            />
                        </MuiPickersUtilsProvider>
                        {errors.date && (<p style={{ color: "#f44336" }}>{errors.date.message}</p>)}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}>
                            Add Expense
                      </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}