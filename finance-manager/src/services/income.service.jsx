import axios from "axios";

const BASE_URL = "http://localhost:4000/api/v1";

export const fetchIncomeData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/income/all`);

    if (response.status === 200) {
      const data = response.data.income;
      return data;
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const createIncome = async (incomeData) => {
  try {
    const response = await axios.post(`${BASE_URL}/add/income`, incomeData);
    if (response.status === 200) {
      const data = response.data.income;
      return data;
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const deleteIncome = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/income/delete/${id}`);
    if (response.status === 200) {
      const data = response.data.income;
      return data;
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const updateIncomeFromDb = async (income) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/income/edit/${income._id}`,
      income
    );
    if (response.status === 200) {
      const data = response.data.income;
      return data;
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};
