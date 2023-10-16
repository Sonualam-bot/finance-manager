const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "Description is needed"],
    },
    amount: {
      type: Number,
      required: [true, "Please enter amount"],
    },
    category: {
      type: String,
      enum: [
        "Housing",
        "Transportation",
        "Food",
        "Entertainment",
        "Health",
        "Shopping",
        "Education",
        "Travel",
        "Miscellaneous",
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
