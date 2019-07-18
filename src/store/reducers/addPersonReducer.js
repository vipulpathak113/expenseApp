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
            return {
                ...state,
                personSuccess: 'New Person Created successfully',
                personError: null,
                data: [...state.data,action.data]

            };
        case 'CREATE_PERSON_ERROR':
            return {

                personError: action.data,
                personSuccess: null
            };
        case 'FETCH_PERSON':
            return {...state,
                data1: [...action.payload]}

        case 'UPDATE_PERSON':
            return {
                ...state,
                personSuccess: 'Person updated successfully',
                personError: null,
                data: action.data

            };
        case 'UPDATE_PERSON_ERROR':
            return {

                personError: 'Person not updated',
                personSuccess: null
            };

        case 'DELETE_PERSON':
            return {
                ...state,
                personSuccess: 'Person deleted successfully',
                personError: null,
                data2: action.data

            };
        case 'DELETE_PERSON_ERROR':
            return {

                personError: 'Person not deleted',
                personSuccess: null
            };


        default:
            return state;
    }
}

export default personReducer