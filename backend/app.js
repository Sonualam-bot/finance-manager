const express = require("express");
const app = express();
const cors = require("cors");

const income = require("./routes/Income.routes");
const expense = require("./routes/Expense.routes");
const saving = require("./routes/Saving.routes");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Financial Management");
});

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

//versioning
app.use("/api/v1", income);
app.use("/api/v1", expense);
app.use("/api/v1", saving);

module.exports = app;
