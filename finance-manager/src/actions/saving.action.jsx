export const getSavings = (saving) => ({
  type: "GET_SAVING",
  payload: saving,
});

export const addSavings = (savingInput) => ({
  type: "ADD_SAVING",
  payload: savingInput,
});
