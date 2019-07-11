import axios from 'axios'

export const createPerson = (person) => {
    console.log(person)
    return (dispatch, getState) => {
        console.log(getState())
        axios.post("http://127.0.0.1:8000/expense/person",
            person
        ).then(response => {
            console.log(response)
            if (response.status === 201) {
                dispatch({ type: 'CREATE_PERSON', data: response.data })
            }
        }).catch((error) => {
            console.log(error.response.data)
            dispatch({ type: 'CREATE_PERSON_ERROR', data: error.response.data })
        })
    }

}

export const updatePerson = (person) => {
    console.log(person)
    return (dispatch, getState) => {
        console.log(person.id)
        axios.put(`http://127.0.0.1:8000/expense/person/?pk=${person.personId}`,
            {

                "name": person.name,
                "nickname": person.nickname,
                "comment": person.comment,
                "sheetId": person.sheetId

            }
        ).then(response => {
            console.log(response)
            if (response.status === 200) {
                dispatch({ type: 'UPDATE_PERSON', data: response.data })
            }
        }).catch((err) => {
            dispatch({ type: 'UPDATE_PERSON_ERROR', data: err })
        })


    }

}

export const deletePerson = (person) => {
    console.log(person)
    return (dispatch, getState) => {
        console.log(person)
        if (person.items)
            person.items.map(item => {
                axios.delete(`http://127.0.0.1:8000/expense/person/?pk=${item}`
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
