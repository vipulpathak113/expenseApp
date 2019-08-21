const initState = {
  data: "",
  detail: "",
  isLoading: true
};

const paymentReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_ALL_PAYMENT":
      return {
        ...state,
        data: action.payload,
        isLoading: false
      };
    case "FETCH_DETAIL":
      return {
        ...state,
        detail: action.payload,
        isLoading: true
      };
    default:
      return state;
  }
};

export default paymentReducer;
