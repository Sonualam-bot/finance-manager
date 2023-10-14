import { getSavings } from "../actions/saving.action";
import {
  addSavings,
  deleteSaving,
  fetchSavings,
  updateSavingFromDb,
} from "../services/saving.service";

export const getAllSavings = async (dispatch) => {
  try {
    const data = await fetchSavings();
    dispatch(getSavings(data));
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const addNewSaving = async (dispatch) => {
  try {
    const data = await addSavings();
    if (data) {
      dispatch(getSavings(data));
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const updateSavingAfterDeletion = async (dispatch, id) => {
  try {
    const dataAfterDeletion = await deleteSaving(id);
    if (dataAfterDeletion) {
      getAllSavings(dispatch);
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const updateSavingAfterEdit = async (dispatch, item) => {
  try {
    const data = await updateSavingFromDb(item);
    if (data) {
      getAllSavings(dispatch);
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};
