const mongoose = require("mongoose");

const savingSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "Please provie description"],
    },
    amount: {
      type: Number,
      required: [true, "Please provide an amount"],
    },
    category: {
      type: String,
      enum: [
        "Emergency Fund",
        "Retirement",
        "Travel",
        "Education",
        "Home Down Payment",
        "Vacation",
        "Debt Repayment",
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Savings = mongoose.model("Savings", savingSchema);

module.exports = Savings;
