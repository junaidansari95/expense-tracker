const initialState = {
    isGetExpenseRequestLoading: false, isPostRequestLoading: false, isUpdateRequestLoading: false , isDeleteRequestLoading: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "GET_EXPENSES_REQUEST":
            return {
                ...state, isGetRequestLoading: true
            }
        case "GET_EXPENSES_SUCCESS":
            return {
                ...state, isGetRequestLoading: false, expenses: action.payload.reverse()
            }
        case "GET_EXPENSES_FAILURE":
            return {
                ...state, isGetRequestLoading: false
            }
        case "POST_EXPENSES_REQUEST":
            return {
                ...state, isPostRequestLoading: true
            }
        case "POST_EXPENSES_SUCCESS":
            return {
                ...state, isPostRequestLoading: false
            }
        case "POST_EXPENSES_FAILURE":
            return {
                ...state, isPostRequestLoading: false
            }
        case "UPDATE_EXPENSES_REQUEST":
            return {
                ...state, isUpdateRequestLoading: true
            }
        case "UPDATE_EXPENSES_SUCCESS":
            return {
                ...state, isUpdateRequestLoading: false
            }
        case "UPDATE_EXPENSES_FAILURE":
            return {
                ...state, isUpdateRequestLoading: false
            }
        case "DELETE_EXPENSES_REQUEST":
            return {
                ...state, isDeleteRequestLoading: true
            }
        case "DELETE_EXPENSES_SUCCESS":
            return {
                ...state, isDeleteRequestLoading: false
            }
        case "DELETE_EXPENSES_FAILURE":
            return {
                ...state, isDeleteRequestLoading: false
            }
        default:
            return state
    }
}