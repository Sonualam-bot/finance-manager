import axios from "axios";

const BASE_URL = "http://localhost:4000/api/v1";

export const fetchSavings = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/saving/all`);
    if (response.status === 200) {
      const data = response.data.saving;
      return data;
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const addSavings = async (savingData) => {
  try {
    const response = await axios.post(`${BASE_URL}/add/saving`, savingData);

    if (response.status === 200) {
      const data = response.data.saving;
      return data;
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const deleteSaving = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/saving/delete/${id}`);
    if (response.status === 200) {
      const data = response.data.saving;
      return data;
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const updateSavingFromDb = async (saving) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/saving/edit/${saving._id}`,
      saving
    );
    if (response.status === 200) {
      const data = response.data.saving;
      return data;
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};
