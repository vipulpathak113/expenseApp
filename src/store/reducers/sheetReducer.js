

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
            console.log("created successfully", action.data)
            return {
                ...state,
                sheetSuccess: 'New Sheet Created successfully',
                sheetError: null,
                data: action.data

            };
        case 'CREATE_SHEET_ERROR':
            console.log("created error", action.err)
            return {

                sheetError: 'Sheet not created',
                sheetSuccess: null
            };
       
        case 'FETCH_PAYMENTS':
            console.log("fetched successfully", action.payload)
            return {...state,
                data1: action.payload}


        case 'FETCH_SHEETS':
            console.log("fetched successfully", action.payload)
            return {...state,
                sheet: action.payload}            


        case 'UPDATE_SHEET':
            console.log("updated successfully", action.data)
            return {
                ...state,
                sheetSuccess: 'Sheet Updated successfully',
                sheetError: null,
                data: action.data

            };
        case 'UPDATE_SHEET_ERROR':
            console.log("updated error", action.err)
            return {

                sheetError: 'Sheet not updated',
                sheetSuccess: null
            };
        default:
            return state;
    }
}

export default sheetReducer