const mongoose = require("mongoose");

const savingSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Please provie description"],
  },
  amount: {
    type: Number,
    required: [true, "Please provide an amount"],
  },
});

const Savings = mongoose.model("Savings", savingSchema);

module.exports = Savings;
