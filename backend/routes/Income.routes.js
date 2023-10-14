const express = require("express");
const incomeRouter = express.Router();

const {
  addIncome,
  getIncomeData,
  deleteIncomeById,
  editIncomeData,
} = require("../controllers/Income.controller");

incomeRouter.post("/add/income", async (req, res) => {
  try {
    if (!req.body.description || !req.body.amount) {
      res.status(401).json({
        success: false,
        message: "Description or amount is required",
      });
    }

    const income = await addIncome(req.body);

    res.status(200).json({
      success: true,
      message: "Successfully added income",
      income: income,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add Income",
    });
  }
});

incomeRouter.get("/income/all", async (req, res) => {
  try {
    const getAllIncomeData = await getIncomeData();
    if (getAllIncomeData.length < 0) {
      res.status(401).json({
        success: false,
        message: "No Income data found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Successfully fetched income data",
      income: getAllIncomeData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch Income Data",
    });
  }
});

incomeRouter.delete("/income/delete/:incomeId", async (req, res) => {
  try {
    const incomeId = req.params.incomeId;

    const income = await deleteIncomeById(incomeId);

    if (!income) {
      res.status(401).json({
        success: false,
        message: "Expense by id not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully deleted Expense",
      income: income,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete income",
    });
  }
});

incomeRouter.post("/income/edit/:incomeId", async (req, res) => {
  try {
    const incomeId = req.params.incomeId;
    const updatedIncome = await editIncomeData(incomeId, req.body);
    if (!updatedIncome) {
      res.status(401).json({
        success: false,
        message: "income listing not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated income data",
      income: updatedIncome,
    });
  } catch (error) {
    throw new Error(`${error.message}`);
  }
});

module.exports = incomeRouter;
