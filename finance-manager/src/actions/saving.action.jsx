export const getSavings = (saving) => ({
  type: "GET_SAVING",
  payload: saving,
});

export const addSavingsInput = (savingInput) => ({
  type: "ADD_SAVING",
  payload: savingInput,
});

export const editSaving = (status) => ({
  type: "EDIT_SAVING",
  payload: status,
});
