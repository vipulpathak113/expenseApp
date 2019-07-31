import axios from "axios";

export const getAllExpenses = expense => {
  console.log(expense);
  return dispatch => {
    axios
      .get(
        `http://127.0.0.1:8000/expense/compute/?pk=${expense.id}&pageNo=${
          expense.currentPage
        }`
      )
      .then(response => {
        dispatch({ type: "FETCH_EXPENSES", payload: response.data });
      });
  };
};

export const getfilterexpense = expense => {
  console.log(expense);
  return dispatch => {
    axios
      .get(`http://127.0.0.1:8000/expense/filter/?pk=${expense}`)
      .then(response => {
        dispatch({ type: "FETCH_EXPENSES_FILTER", payload: response.data });
      });
  };
};



export const filterexpense = expense => {
  console.log(expense);
  return dispatch => {
    axios
      .get(`http://127.0.0.1:8000/expense/items/?pk=${expense.sheetId}&items=${expense.value}`)
      .then(response => {
        dispatch({ type: "FETCH_FILTER_EXPENSES", payload: response.data });
      });
  };
};


export const createExpense = expense => {
  return (dispatch, getState) => {
    axios
      .post("http://127.0.0.1:8000/expense/", expense)
      .then(response => {
        if (response.status === 201) {
          dispatch({ type: "CREATE_EXPENSE", data: response.data });
          axios
            .get(
              `http://127.0.0.1:8000/expense/compute/?pk=${
                expense.sheetId
              }&pageNo=${expense.currentPage}`
            )
            .then(response => {
              dispatch({ type: "FETCH_EXPENSES", payload: response.data });
            });

          axios
            .get(`http://127.0.0.1:8000/expense/payment/?pk=${expense.sheetId}`)
            .then(response => {
              dispatch({ type: "FETCH_PAYMENTS", payload: response.data });
            });
        }
      })
      .catch(err => {
        dispatch({ type: "CREATE_EXPENSE_ERROR", data: err });
      });
  };
};

export const updateExpense = expense => {
  return (dispatch, getState) => {
    axios
      .put(
        `http://127.0.0.1:8000/expense/compute/?pk=${expense.sheetId}&eid=${
          expense.expenseId
        }`,
        {
          amount: expense.amount,
          date: expense.date,
          description: expense.description,
          paidBy: expense.paidBy,
          paidTo: expense.paidTo,
          sheetId: expense.sheetId,
          id: expense.expenseId
        }
      )
      .then(response => {
        if (response.status === 200) {
          dispatch({ type: "UPDATE_EXPENSE", data: response.data });
          axios
            .get(
              `http://127.0.0.1:8000/expense/?pk=${expense.sheetId}&pageNo=${
                expense.currentPage
              }`
            )
            .then(response => {
              dispatch({ type: "FETCH_EXPENSES", payload: response.data });
            });
        }
      })
      .catch(err => {
        dispatch({ type: "UPDATE_EXPENSE_ERROR", data: err });
      });
  };
};

export const deleteExpense = expense => {
  return (dispatch, getState) => {
    if (expense.items)
      expense.items.map((item, id) => {
        axios
          .delete(`http://127.0.0.1:8000/expense/?pk=${item}`)
          .then(response => {
            if (response.status === 204) {
              dispatch({ type: "DELETE_EXPENSE", data: response.data });
              axios
                .get(
                  `http://127.0.0.1:8000/expense/compute/?pk=${
                    expense.sheetId
                  }&pageNo=${expense.currentPage}`
                )
                .then(response => {
                  dispatch({ type: "FETCH_EXPENSES", payload: response.data });
                });

              axios
                .get(
                  `http://127.0.0.1:8000/expense/payment/?pk=${expense.sheetId}`
                )
                .then(response => {
                  dispatch({ type: "FETCH_PAYMENTS", payload: response.data });
                });
            }
          })
          .catch(err => {
            dispatch({ type: "DELETE_EXPENSE_ERROR", data: err });
          });
      });
  };
};
