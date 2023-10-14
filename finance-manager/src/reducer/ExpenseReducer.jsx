const initialState = {
  expenseDb: [],
  expenseInput: {
    description: "",
    amount: "",
    category: "",
  },
  editExpenseData: false,
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
    case "EDIT_EXPENSE":
      return {
        ...state,
        editExpenseData: action.payload,
      };
    default:
      return state;
  }
};
