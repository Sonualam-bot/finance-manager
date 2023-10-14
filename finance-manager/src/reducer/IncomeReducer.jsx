const initialState = {
  incomeDb: [],
  incomeInput: {
    description: "",
    amount: "",
  },
};

export const IncomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_INCOME":
      return {
        ...state,
        incomeDb: action.payload,
      };
    case "SET_INCOME":
      return {
        ...state,
        incomeInput: action.payload,
      };
    default:
      return state;
  }
};
