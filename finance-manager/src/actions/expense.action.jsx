export const getExpense = (expense) => ({
  type: "GET_EXPENSE",
  payload: expense,
});

export const addExpense = (expenseInput) => ({
  type: "ADD_EXPENSE",
  payload: expenseInput,
});
