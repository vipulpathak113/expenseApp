import sheetReducer from './sheetReducer'
import { combineReducers } from 'redux'
import addPerson from './addPersonReducer'
import expenseReducer from './expenseReducer'


const rootReducer = combineReducers({
    sheet: sheetReducer,
    person: addPerson,
    expense: expenseReducer
});

export default rootReducer