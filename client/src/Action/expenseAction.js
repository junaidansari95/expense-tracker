import axios from 'axios';

export const getExpenses = () => dispatch => {
    dispatch({ type: "GET_EXPENSES_REQUEST" })
    axios.get("/api/expenses")
        .then(response => {
            dispatch({ type: "GET_EXPENSES_SUCCESS", payload: response.data.data })
        })
        .catch(err => {
            dispatch({ type: "GET_EXPENSES_FAILURE", payload: err.response.data })
        });
};

export const createExpenses = (data) => dispatch => {
    dispatch({ type: "POST_EXPENSES_REQUEST", payload: data })
    axios.post("/api/expenses", data)
        .then(response => {
            dispatch({ type: "POST_EXPENSES_SUCCESS", payload: response.data.data })
            dispatch(getExpenses())
        })
        .catch(err => {
            dispatch({ type: "POST_EXPENSES_FAILURE", payload: err.response.data })
        });
};

export const updateExpenses = (data) => dispatch => {
    dispatch({ type: "UPDATE_EXPENSES_REQUEST", payload: data })
    axios.put(`/api/expenses/update?id=${data.id}`, data)
        .then(response => {
            dispatch({ type: "UPDATE_EXPENSES_SUCCESS", payload: response.data })
            dispatch(getExpenses())
        })
        .catch(err => {
            dispatch({ type: "UPDATE_EXPENSES_FAILURE", payload: err.response.data })
        });
};

export const deleteExpenses = (id) => dispatch => {
    dispatch({ type: "DELETE_EXPENSES_REQUEST" })
    axios.delete(`/api/expenses/delete?id=${id}`)
        .then(response => {
            dispatch({ type: "DELETE_EXPENSES_SUCCESS", payload: response.data.data })
            dispatch(getExpenses())
        })
        .catch(err => {
            dispatch({ type: "DELETE_EXPENSES_FAILURE", payload: err.response.data })
        });
};