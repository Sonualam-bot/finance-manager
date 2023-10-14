export const getIncome = (income) => ({
  type: "GET_INCOME",
  payload: income,
});

export const addIncome = (incomeData) => ({
  type: "SET_INCOME",
  payload: incomeData,
});

export const editIncome = (status) => ({
  type: "EDIT_INCOME",
  payload: status,
});
