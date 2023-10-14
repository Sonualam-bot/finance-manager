const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
  },
});

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
