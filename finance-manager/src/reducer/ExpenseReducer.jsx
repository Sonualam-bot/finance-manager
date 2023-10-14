const initialState = {
  expenseDb: [],
  expenseInput: {
    description: "",
    amount: "",
    category: "",
  },
};

export const ExpenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_EXPENSE":
      return {
        ...state,
        expenseDb: action.payload,
      };
    case "ADD_EXPENSE":
      return {
        ...state,
        expenseInput: action.payload,
      };
    default:
      return state;
  }
};
