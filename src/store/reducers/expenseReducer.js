

const initState = {
    expenseSuccess: null,
    expenseError: null,
    data: ''
}

const expenseReducer = (state = initState, action) => {

    switch (action.type) {
        case 'CREATE_EXPENSE':
            console.log("created successfully", action.data)
            return {
                ...state,
                expenseSuccess: 'New expense Created successfully',
                expenseError: null,
                data: action.data

            };
        case 'CREATE_EXPENSE_ERROR':
            console.log("created error", action.err)
            return {

                expenseError: 'expense not created',
                expenseSuccess: null
            };

        case 'UPDATE_EXPENSE':
            console.log("updated successfully", action.data)
            return {
                ...state,
                sheetSuccess: 'Expense Updated successfully',
                sheetError: null,
                data: action.data

            };
        case 'UPDATE_EXPENSE_ERROR':
            console.log("updated error", action.err)
            return {

                sheetError: 'Expense not updated',
                sheetSuccess: null
            };

        case 'DELETE_EXPENSE':
            console.log("created successfully", action.data)
            return {
                ...state,
                expenseSuccess: 'Expense deleted successfully',
                expenseError: null,
                data: action.data

            };
        case 'DELETE_EXPENSE_ERROR':
            console.log("deleted error", action.err)
            return {

                expenseError: 'expense not deleted',
                expenseSuccess: null
            };

        default:
            return state;
    }
}

export default expenseReducer