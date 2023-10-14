const initialState = {
  savingDb: [],
  savingInput: {
    description: "",
    amount: "",
  },
};

export const SavingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SAVING":
      return {
        ...state,
        savingDb: action.payload,
      };
    case "ADD_SAVING":
      return {
        ...state,
        savingInput: action.payload,
      };
    default:
      return state;
  }
};
