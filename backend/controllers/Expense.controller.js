const Expense = require("../models/expense.model");

async function addExpense(expenseData) {
  try {
    const expense = new Expense(expenseData);
    const addNewExpense = await expense.save();
    return addNewExpense;
  } catch (error) {
    throw error;
  }
}

async function getAllExpense() {
  try {
    const expense = await Expense.find({});
    return expense;
  } catch (error) {
    throw error;
  }
}

async function deleteExpenseById(id) {
  try {
    const expense = await Expense.findByIdAndDelete({ _id: id });
    return expense;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addExpense,
  getAllExpense,
  deleteExpenseById,
};
