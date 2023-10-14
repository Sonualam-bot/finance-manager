const initialState = {
  incomeDb: [],
  incomeInput: {
    description: "",
    amount: "",
    editIncomeData: false,
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
    case "EDIT_INCOME":
      return {
        ...state,
        editIncomeData: action.payload,
      };
    default:
      return state;
  }
};
