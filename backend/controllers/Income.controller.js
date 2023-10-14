const Income = require("../models/Income.model");

async function addIncome(incomeData) {
  try {
    const income = new Income(incomeData);
    const addNewIncome = await income.save();
    return addNewIncome;
  } catch (error) {
    throw error;
  }
}

async function getIncomeData() {
  try {
    const income = await Income.find({});
    return income;
  } catch (error) {
    throw error;
  }
}

async function deleteIncomeById(id) {
  try {
    const income = await Income.findByIdAndDelete({ _id: id });
    return income;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addIncome,
  getIncomeData,
  deleteIncomeById,
};
