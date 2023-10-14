import axios from "axios";

const BASE_URL = "http://localhost:4000/api/v1";

export const fetchExpenses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/expense/all`);
    if (response.status === 200) {
      const data = response.data.expense;
      return data;
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const addExpenses = async (expenseData) => {
  try {
    const response = await axios.post(`${BASE_URL}/add/expense`, expenseData);
    if (response.status === 200) {
      const data = response.data.expense;
      return data;
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const deleteExpense = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/expense/delete/${id}`);
    if (response.status === 200) {
      const data = response.data.expense;
      return data;
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};
