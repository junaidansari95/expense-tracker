/*eslint-diable*/
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import { Box, Button, Typography, IconButton, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { getExpenses, updateExpenses, deleteExpenses } from '../Action/expenseAction';
const useStyles = makeStyles({
  list: {
    display: 'flex',
    flexDirection:'column',
    alignItems: 'center',
    marginTop: 18,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
  },
  paper: {
    margin: 8,
    width: 410,
    height: 100,
    padding: 12,
    justifyContent: 'flex-start'
  },
  title: {
    width: 300,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  middleRow: {
    display: 'flex',
    justifyContent: 'space-between'
  },
});
export default () => {
  const classes = useStyles();
  const { expenses } = useSelector(state => state.expenses);
  const dispatch = useDispatch();
  // eslint-disable-next-line
  useEffect(() => { dispatch(getExpenses()) }, [])
  return (
    <Box className={classes.list}>
      {
        (undefined !== expenses && expenses.length) && expenses.map(expenseItem => {
          return <ListItem expenseItem={expenseItem} />
        })
      }
    </Box>
  )
}
const ListItem = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { expenseItem } = props;
  const handleDeleteExpense = () => {
    dispatch(deleteExpenses(expenseItem._id))
  }
  return (
    <Box className={classes.item}>
      <UpdateListItem expenseItem={expenseItem} />
      <Paper className={classes.paper}>
        <Typography variant="overline" display="block" gutterBottom>{new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "long", day: "2-digit" }).format(Date.parse(expenseItem.exp_date))}</Typography>
        <Box className={classes.middleRow}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            {expenseItem.title}
          </Typography>
          <Typography variant="h6" gutterBottom>
            ₹{expenseItem.amount}
          </Typography>
        </Box>
        <Typography variant="caption" display="block" gutterBottom className={classes.title}>
          <strong>NOTE:&nbsp;</strong>{expenseItem.note}
        </Typography>
      </Paper>
      <IconButton aria-label="Edit" onClick={handleDeleteExpense}>
        <CancelIcon />
      </IconButton>
    </Box>
  );
}
const UpdateListItem = (props) => {
  const dispatch = useDispatch();
  const { expenseItem } = props;
  const [title, setTitle] = useState(expenseItem.title);
  const [amount, setAmount] = useState(expenseItem.amount);
  const [note, setNote] = useState(expenseItem.note);
  const [date, setDate] = useState(expenseItem.exp_date);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleExpenseUpdate = () => {
    setOpen(false);
    dispatch(updateExpenses({
      id: expenseItem._id,
      title: title,
      amount: amount,
      note: note,
      exp_date: date
    }))
  };
  return (
    <Box>
      <IconButton aria-label="Edit" onClick={() => setOpen(true)}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Expense</DialogTitle>
        <DialogContent>
          <TextField defaultValue={title} onChange={(e) => setTitle(e.target.value)} variant="outlined" margin="normal" fullWidth label="Title" type="text" />
          <TextField defaultValue={amount} onChange={(e) => setAmount(e.target.value)} variant="outlined" margin="normal" fullWidth label="Amount" type="number" />
          <TextField defaultValue={note} onChange={(e) => setNote(e.target.value)} variant="outlined" margin="normal" fullWidth label="Note" type="text" />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker fullWidth disableFuture
              variant="inline" inputVariant="outlined" margin="normal"
              label="Date" openTo="date" views={["year", "month", "date"]} value={date}
              onChange={(newValue) => setDate(newValue)}
              renderInput={(props) => <TextField {...props} />} />
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleExpenseUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}