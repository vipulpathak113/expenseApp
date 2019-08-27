/* eslint-disable */
import axios from "axios";
import history from "../../components/history";

export const createSheet = sheet => {
  return dispatch => {
    axios
      .post("http://127.0.0.1:8000/expense/sheet", sheet)
      .then(response => {
        if (response.status === 201) {
          dispatch({ type: "CREATE_SHEET", data: response.data });
          history.push("/" + "sheet" + "/" + response.data.sheet);
          // window.location.reload();
        }
      })
      .catch(err => {
        dispatch({ type: "CREATE_SHEET_ERROR", data: err });
      });
  };
};

export const updateSheet = sheet => {
  return (dispatch, getState) => {
    axios
      .put(`http://127.0.0.1:8000/expense/sheet/?pk=${sheet.sid}`, {
        display_name: sheet.display_name,
        description: sheet.description
      })
      .then(response => {
        if (response.status === 200) {
          dispatch({ type: "UPDATE_SHEET", data: response.data });
          axios
            .get(`http://127.0.0.1:8000/expense/sheet/?pk=${sheet.sid}`)
            .then(response => {
              dispatch({ type: "FETCH_SHEETS", payload: response.data });
            });
        }
      })
      .catch(err => {
        dispatch({ type: "UPDATE_SHEET_ERROR", data: err });
      });
  };
};

export const getPayments = payment => {
  return dispatch => {
    axios
      .get(`http://127.0.0.1:8000/expense/payment/?pk=${payment.id}`)
      .then(response => {
        dispatch({ type: "FETCH_PAYMENTS", payload: response.data });
      });
  };
};

export const getSheets = sheet => {
  return dispatch => {
    axios
      .get(`http://127.0.0.1:8000/expense/sheet/?pk=${sheet.id}`)
      .then(response => {
        dispatch({ type: "FETCH_SHEETS", payload: response.data });
      });
  };
};
