const express = require("express");
const savingRouter = express.Router();

const {
  addSavings,
  getAllSavings,
  deleteSavingById,
  editSavingData,
} = require("../controllers/Saving.controller");

savingRouter.post("/add/saving", async (req, res) => {
  try {
    if (!req.body.description || !req.body.amount) {
      res.status(401).json({
        success: false,
        message: "Description or amount is required",
      });
    }

    const saving = await addSavings(req.body);

    res.status(200).json({
      success: true,
      message: "Successfully added saving",
      saving: saving,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add saving",
    });
  }
});

savingRouter.get("/saving/all", async (req, res) => {
  try {
    const savings = await getAllSavings();
    if (savings.length < 0) {
      res.status(401).json({
        success: false,
        message: "No Data in savings",
      });
    }
    res.status(200).json({
      success: true,
      message: "Successfully fetched savings",
      saving: savings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Faild to fetch savings",
    });
  }
});

savingRouter.delete("/saving/delete/:savingId", async (req, res) => {
  try {
    const savingId = req.params.savingId;

    const saving = await deleteSavingById(savingId);

    if (!saving) {
      res.status(401).json({
        success: false,
        message: "saving by id not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully deleted saving",
      saving: saving,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete saving",
    });
  }
});

savingRouter.post("/saving/edit/:savingId", async (req, res) => {
  try {
    const savingId = req.params.savingId;
    const updatedSaving = await editSavingData(savingId, req.body);
    if (!updatedSaving) {
      res.status(401).json({
        success: false,
        message: "saving listing not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated income data",
      saving: updatedSaving,
    });
  } catch (error) {
    throw new Error(`${error.message}`);
  }
});

module.exports = savingRouter;
