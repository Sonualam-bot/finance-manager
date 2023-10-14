import { getExpense } from "../actions/expense.action";
import {
  addExpenses,
  deleteExpense,
  fetchExpenses,
} from "../services/expense.service";

export const getAllExpenses = async (dispatch) => {
  try {
    const data = await fetchExpenses();
    dispatch(getExpense(data));
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const addNewExpense = async (dispatch) => {
  try {
    const data = await addExpenses();
    if (data) {
      dispatch(getAllExpenses(data));
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const updateExpenseAfterDeletion = async (dispatch, id) => {
  try {
    const dataAfterDeletion = await deleteExpense(id);
    if (dataAfterDeletion) {
      getAllExpenses(dispatch);
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};
