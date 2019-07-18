

const initState = {
    sheetSuccess: null,
    sheetError: null,
    data: '',
    data1:'',
    sheet:''
}

const sheetReducer = (state = initState, action) => {

    switch (action.type) {
        case 'CREATE_SHEET':
            return {
                ...state,
                sheetSuccess: 'New Sheet Created successfully',
                sheetError: null,
                data: action.data

            };
        case 'CREATE_SHEET_ERROR':
            return {

                sheetError: 'Sheet not created',
                sheetSuccess: null
            };
       
        case 'FETCH_PAYMENTS':
            return {...state,
                data1: action.payload}


        case 'FETCH_SHEETS':
            return {...state,
                sheet: action.payload}            


        case 'UPDATE_SHEET':
            return {
                ...state,
                sheetSuccess: 'Sheet Updated successfully',
                sheetError: null,
                data: action.data

            };
        case 'UPDATE_SHEET_ERROR':
            return {

                sheetError: 'Sheet not updated',
                sheetSuccess: null
            };
        default:
            return state;
    }
}

export default sheetReducer