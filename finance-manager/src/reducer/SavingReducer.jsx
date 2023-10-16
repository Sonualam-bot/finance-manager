const initialState = {
  savingDb: [],
  savingInput: {
    description: "",
    amount: "",
    category: "",
  },
  editSavingData: false,
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
    case "EDIT_SAVING":
      return {
        ...state,
        editSavingData: action.payload,
      };
    default:
      return state;
  }
};
