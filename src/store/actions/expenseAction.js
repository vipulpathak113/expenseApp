import axios from 'axios'

export const createExpense = (expense) => {
    console.log(expense)
    return (dispatch, getState) => {
        axios.post("http://127.0.0.1:8000/expense/",
            expense
        ).then(response => {
            console.log(response)
                dispatch({ type: 'CREATE_EXPENSE', data: response.data })
        }).catch((err) => {
            dispatch({ type: 'CREATE_EXPENSE_ERROR', data: err })
        })
    }

}

export const updateExpense = (expense) => {
    console.log(expense)
    return (dispatch, getState) => {
        axios.put(`http://127.0.0.1:8000/expense/?pk=${expense.sheetId}&eid=${expense.expenseId}`,
            {
                "amount": expense.amount,
                "date": expense.date,
                "description": expense.description,
                "paidBy": expense.paidBy,
                "paidTo": expense.paidTo,
                "sheetId": expense.sheetId,
                "id": expense.expenseId

            }
        ).then(response => {
            console.log(response)
            if (response.status === 200) {
                dispatch({ type: 'UPDATE_EXPENSE', data: response.data })
            }
        }).catch((err) => {
            dispatch({ type: 'UPDATE_EXPENSE_ERROR', data: err })
        })


    }

}

export const deleteExpense = (expense) => {
    console.log(expense)
    return (dispatch, getState) => {
        console.log(expense)
        if (expense.items)
            expense.items.map((item, id) => {
                console.log(item)
                console.log(id)
                axios.delete(`http://127.0.0.1:8000/expense/?pk=${item}`
                ).then(response => {
                    console.log(response)
                    if (response.status === 204) {
                        dispatch({ type: 'DELETE_PERSON', data: response.data })
                    }
                }).catch((err) => {
                    dispatch({ type: 'DELETE_PERSON_ERROR', data: err })
                })
            }
            )

    }

}