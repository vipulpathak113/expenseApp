import axios from 'axios'


export const getAllPayment = (payment) => {
    var url="https://cors-anywhere.herokuapp.com/http://www.shortreckonings.com/api/1.0/query.php?"
    console.log(payment)
    return (dispatch) => {
   var arr1=[]
        for (var i = 0; i < payment.persons.length; i++){
         arr1.push(payment.persons[i].nickname)
        }
        console.log(arr1)

        if (payment.expenses)
        payment.expenses.map((item, id) => {
  url= url+ `&e[]=${item[3]},(0,1,*0)&map=${arr1}`
        axios.get(url)
        .then(response => {
                // dispatch({ type: 'FETCH_PERSON', payload: response.data })
        })

  


    }
      )}

}