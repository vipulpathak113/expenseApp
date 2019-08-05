import axios from "axios";
var _ = require("lodash");

export const getAllPayment = payment => {
  var url =
    "https://cors-anywhere.herokuapp.com/http://www.shortreckonings.com/api/1.0/query.php?";
  return dispatch => {
    var arr1 = [];
    for (var i = 0; i < payment.persons.length; i++) {
      arr1.push(payment.persons[i].nickname);
    }

    var arr2 = [];
    for (var i = 0; i < payment.expenses.length; i++) {
      arr2.push(payment.expenses[i][4]);
    }

    var arr3 = [];
    for (var k = 0; k < arr2.length; k++) {
      for (var j = 0; j < arr1.length; j++) {
        if (arr2[k].includes(arr1[j]) && arr1[j] === payment.expenses[k][2]) {
          arr3.push("*1");
        } else if (arr2[k].includes(arr1[j])) {
          arr3.push(1);
        } else if (
          !arr2[k].includes(arr1[j]) &&
          arr1[j] === payment.expenses[k][2]
        ) {
          arr3.push("*0");
        } else if (!arr2[k].includes(arr1[j])) {
          arr3.push(0);
        }
      }
    }

    if (payment.expenses)
      payment.expenses.map((item, id) => {
        url =
          url +
          `&e[]=${item[3]},(${
            _.chunk(arr3, payment.persons.length)[id]
          })&map=${arr1}`;
      });
    axios.get(url).then(response => {
      dispatch({ type: "FETCH_ALL_PAYMENT", payload: response.data });
    });
  };
};
