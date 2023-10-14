const Savings = require("../models/savings.model");

async function addSavings(savingData) {
  try {
    const saving = new Savings(savingData);
    const addNewSaving = await saving.save();
    return addNewSaving;
  } catch (error) {
    throw error;
  }
}

async function getAllSavings() {
  try {
    const allSaving = await Savings.find({});
    return allSaving;
  } catch (error) {
    throw error;
  }
}

async function deleteSavingById(id) {
  try {
    const saving = await Savings.findByIdAndDelete({ _id: id });
    return saving;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addSavings,
  getAllSavings,
  deleteSavingById,
};
