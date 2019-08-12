import axios from "axios";

export const getAllPersons = person => {
  return dispatch => {
    axios
      .get(`http://127.0.0.1:8000/expense/person/?pk=${person.id}`)
      .then(response => {
        dispatch({ type: "FETCH_PERSON", payload: response.data });
      });
  };
};

export const createPerson = person => {
  return (dispatch, getState) => {
    axios
      .post("http://127.0.0.1:8000/expense/person", person)
      .then(response => {
        if (response.status === 201) {
          dispatch({ type: "CREATE_PERSON", data: response.data });
          axios
            .get(`http://127.0.0.1:8000/expense/person/?pk=${person.sheetId}`)
            .then(response => {
              dispatch({ type: "FETCH_PERSON", payload: response.data });
            });
        }
      })
      .catch(error => {
        dispatch({ type: "CREATE_PERSON_ERROR", data: error.response.data });
        axios
          .get(`http://127.0.0.1:8000/expense/person/?pk=${person.sheetId}`)
          .then(response => {
            dispatch({ type: "FETCH_PERSON", payload: response.data });
          });
      });
  };
};

export const updatePerson = person => {
  return (dispatch, getState) => {
    axios
      .put(`http://127.0.0.1:8000/expense/person/?pk=${person.personId}`, {
        name: person.name,
        nickname: person.nickname,
        comment: person.comment,
        sheetId: person.sheetId
      })
      .then(response => {
        if (response.status === 200) {
          dispatch({ type: "UPDATE_PERSON", data: response.data });
          axios
            .get(`http://127.0.0.1:8000/expense/person/?pk=${person.sheetId}`)
            .then(response => {
              dispatch({ type: "FETCH_PERSON", payload: response.data });
            });
        }
      })
      .catch(err => {
        dispatch({ type: "UPDATE_PERSON_ERROR", data: err.response.data });
      });
  };
};

export const deletePerson = person => {
  return dispatch => {
    person.items.forEach(item => {
      axios
        .delete(`http://127.0.0.1:8000/expense/person/?pk=${item}`)
        .then(response => {
          if (response.status === 204) {
            dispatch({ type: "DELETE_PERSON", data: response.data });
            axios
              .get(`http://127.0.0.1:8000/expense/person/?pk=${person.sheetId}`)
              .then(response => {
                dispatch({ type: "FETCH_PERSON", payload: response.data });
              });
          }
        })
        .catch(err => {
          dispatch({ type: "DELETE_PERSON_ERROR", data: err });
        });
    });
  };
};
