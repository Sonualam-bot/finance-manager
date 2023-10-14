import { getExpense } from "../actions/expense.action";
import {
  addExpenses,
  deleteExpense,
  fetchExpenses,
  updateExpenseFromDb,
} from "../services/expense.service";

export const getAllExpenses = async (dispatch) => {
  try {
    const data = await fetchExpenses();
    dispatch(getExpense(data));
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const addNewExpense = async (dispatch, expenseData) => {
  try {
    const data = await addExpenses(expenseData);
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

export const updateExpenseAfterEdit = async (dispatch, item) => {
  try {
    const data = await updateExpenseFromDb(item);
    if (data) {
      getAllExpenses(dispatch);
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};
