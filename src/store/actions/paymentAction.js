import axios from "axios";
var _ = require("lodash");

export const getAllPayment = payment => {
  console.log(payment.expenses);
  var url =
    "https://cors-anywhere.herokuapp.com/http://www.shortreckonings.com/api/1.0/query.php?";
  return dispatch => {
    var arr1 = [];
    for (var i = 0; i < payment.persons.length; i++) {
      arr1.push(payment.persons[i].nickname);
      console.log(arr1);
    }

    var arr2 = [];
    for (var i = 0; i < payment.expenses.length; i++) {
      arr2.push(payment.expenses[i][4]);
      console.log(arr2);
    }

    var arr3 = [];
    for (var k = 0; k < arr2.length; k++) {
      for (var j = 0; j < arr1.length; j++) {
        if (
          arr2[k].some(res => res.includes(arr1[j])) &&
          arr1[j] === payment.expenses[k][2]
        ) {
          var result = arr2[k].map(item =>
            item.substring(0, item.indexOf("-"))
          );
          var index = result.indexOf(arr1[j]);
          arr3.push(
            "*" + arr2[k][index].substring(arr2[k][index].indexOf("-") + 1)
          );
        } else if (arr2[k].some(res => res.includes(arr1[j]))) {
          var result = arr2[k].map(item =>
            item.substring(0, item.indexOf("-"))
          );
          var index = result.indexOf(arr1[j]);
          arr3.push(arr2[k][index].substring(arr2[k][index].indexOf("-") + 1));
        } else if (
          !arr2[k].some(res => res.includes(arr1[j])) &&
          arr1[j] === payment.expenses[k][2]
        ) {
          arr3.push("*0");
        } else if (!arr2[k].some(res => res.includes(arr1[j]))) {
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
