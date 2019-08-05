import sheetReducer from './sheetReducer'
import { combineReducers } from 'redux'
import addPerson from './addPersonReducer'
import expenseReducer from './expenseReducer'
import paymentReducer from './paymentReducer'


const rootReducer = combineReducers({
    sheet: sheetReducer,
    person: addPerson,
    expense: expenseReducer,
    payment: paymentReducer
});

export default rootReducer