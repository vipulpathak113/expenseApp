const initState = {
  data: "",
  detail: ""
};

const paymentReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_ALL_PAYMENT":
      return {
        ...state,
        data: action.payload
      };
    case "FETCH_DETAIL":
      return {
        ...state,
        detail: action.payload
      };
    default:
      return state;
  }
};

export default paymentReducer;
