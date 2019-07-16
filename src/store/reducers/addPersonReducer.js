const initState = {
    personSuccess: null,
    personError: null,
    data: '',
    data1:'',
    data2:''
}

const personReducer = (state = initState, action) => {

    switch (action.type) {
        case 'CREATE_PERSON':
            console.log("created successfully", action.data)
            return {
                ...state,
                personSuccess: 'New Person Created successfully',
                personError: null,
                data: action.data

            };
        case 'CREATE_PERSON_ERROR':
            console.log("created error", action.data)
            return {

                personError: action.data,
                personSuccess: null
            };
        case 'FETCH_PERSON':
            console.log("fetched successfully", action.payload)
            return {...state,
                data1: [...action.payload]}

        case 'UPDATE_PERSON':
            console.log("updated successfully", action.data)
            return {
                ...state,
                personSuccess: 'Person updated successfully',
                personError: null,
                data: action.data

            };
        case 'UPDATE_PERSON_ERROR':
            console.log("update error", action.data)
            return {

                personError: 'Person not updated',
                personSuccess: null
            };

        case 'DELETE_PERSON':
            console.log("deleted successfully", action.data)
            return {
                ...state,
                personSuccess: 'Person deleted successfully',
                personError: null,
                data2: action.data

            };
        case 'DELETE_PERSON_ERROR':
            console.log("deleted error", action.data)
            return {

                personError: 'Person not deleted',
                personSuccess: null
            };


        default:
            return state;
    }
}

export default personReducer