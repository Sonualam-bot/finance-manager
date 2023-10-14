export const getIncome = (income) => ({
  type: "GET_INCOME",
  payload: income,
});

export const addIncome = (incomeData) => ({
  type: "SET_INCOME",
  payload: incomeData,
});
