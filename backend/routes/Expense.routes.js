const express = require("express");
const expenseRouter = express.Router();

const {
  addExpense,
  getAllExpense,
  deleteExpenseById,
} = require("../controllers/Expense.controller");

expenseRouter.post("/add/expense", async (req, res) => {
  try {
    if (!req.body.description || !req.body.amount || !req.body.category) {
      res.status(401).json({
        success: false,
        message: "Description, amount or category is required",
      });
    }

    const expense = await addExpense(req.body);

    res.status(200).json({
      success: true,
      message: "Successfully added expense",
      expense: expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add expense",
    });
  }
});

expenseRouter.get("/expense/all", async (req, res) => {
  try {
    const expense = await getAllExpense();

    if (expense.length < 0) {
      res.status(401).json({
        success: false,
        message: "No data in expense",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully fetched expense",
      expense: expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch expense",
    });
  }
});

expenseRouter.delete("/expense/delete/:expenseId", async (req, res) => {
  try {
    const expenseId = req.params.expenseId;

    const expense = await deleteExpenseById(expenseId);

    if (!expense) {
      res.status(401).json({
        success: false,
        message: "Expense by id not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully deleted Expense",
      expense: expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete expense",
    });
  }
});

module.exports = expenseRouter;
