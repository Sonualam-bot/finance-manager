import { getIncome } from "../actions/income.action";
import {
  createIncome,
  deleteIncome,
  fetchIncomeData,
} from "../services/income.service";

export const getAllIncomeData = async (dispatch) => {
  try {
    const data = await fetchIncomeData();
    dispatch(getIncome(data));
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const addIncomeInput = async (dispatch) => {
  try {
    const data = await createIncome();
    if (data) {
      dispatch(getAllIncomeData(data));
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const updateIncomeAfterDeletion = async (dispatch, id) => {
  try {
    const dataAfterDeletion = await deleteIncome(id);
    if (dataAfterDeletion) {
      getAllIncomeData(dispatch);
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};
