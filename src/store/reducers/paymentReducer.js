const initState = {
  data: ""
};

const paymentReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_ALL_PAYMENT":
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};

export default paymentReducer;
