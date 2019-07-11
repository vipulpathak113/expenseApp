import axios from 'axios'
import history from '../../components/history'

export const createSheet = (sheet) => {
    console.log(sheet)
    return (dispatch) => {
        axios.post("http://127.0.0.1:8000/expense/sheet",
            sheet
        ).then(response => {
            if (response.status === 201) {
                console.log(response)
                dispatch({ type: 'CREATE_SHEET', data: response.data })
                history.push("/" + "sheet/" + response.data.id)
                window.location.reload();
            }
        }).catch((err) => {
            dispatch({ type: 'CREATE_SHEET_ERROR', data: err })
        })


    }

}

export const updateSheet = (sheet) => {
    console.log(sheet)
    return (dispatch, getState) => {
        axios.put(`http://127.0.0.1:8000/expense/sheet/?pk=${sheet.sid}`,
            {
                "display_name": sheet.display_name,
                "description": sheet.description

            }
        ).then(response => {
            console.log(response)
            if (response.status === 200) {
                dispatch({ type: 'UPDATE_SHEET', data: response.data })
            }
        }).catch((err) => {
            dispatch({ type: 'UPDATE_SHEET_ERROR', data: err })
        })


    }

}

