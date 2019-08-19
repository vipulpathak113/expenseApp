const initState = {
  expenseSuccess: null,
  expenseError: null,
  data: "",
  data1: "",
  allexpense: ""
};

const expenseReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_EXPENSE":
      return {
        ...state,
        expenseSuccess: "New expense Created successfully",
        expenseError: null,
        data: [...state.data, action.data]
      };
    case "CREATE_EXPENSE_ERROR":
      return {
        expenseError: "expense not created",
        expenseSuccess: null
      };

    case "FETCH_EXPENSES":
      return { ...state, data1: action.payload };

    case "FETCH_NEW":
      return { ...state, allexpense: action.payload };

    case "FETCH_ALL_EXPENSES":
      return { ...state, data1: action.payload };

    case "FETCH_EXPENSES_FILTER":
      return { ...state, data1: action.payload };

    case "FETCH_FILTER_EXPENSES":
      return { ...state, data1: action.payload };

    case "UPDATE_EXPENSE":
      return {
        ...state,
        sheetSuccess: "Expense Updated successfully",
        sheetError: null,
        data: action.data
      };
    case "UPDATE_EXPENSE_ERROR":
      return {
        sheetError: "Expense not updated",
        sheetSuccess: null
      };

    case "DELETE_EXPENSE":
      return {
        ...state,
        expenseSuccess: "Expense deleted successfully",
        expenseError: null,
        data: action.data
      };
    case "DELETE_EXPENSE_ERROR":
      return {
        expenseError: "expense not deleted",
        expenseSuccess: null
      };

    default:
      return state;
  }
};

export default expenseReducer;
