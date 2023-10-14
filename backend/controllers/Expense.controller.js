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

async function editExpenseData(id, updateData) {
  try {
    const updateExpenseItem = await Expense.findByIdAndUpdate(
      { _id: id },
      updateData,
      { new: true }
    );
    return updateExpenseItem;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}

module.exports = {
  addExpense,
  getAllExpense,
  deleteExpenseById,
  editExpenseData,
};
