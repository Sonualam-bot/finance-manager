import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Savings from "./pages/Savings";
import Header from "./components/Header";
import NavigationLeft from "./components/NavigationLeft";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { getAllIncomeData } from "./utils/income.utils";
import { getAllSavings } from "./utils/saving.util";
import { getAllExpenses } from "./utils/expense.utils";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getAllIncomeData(dispatch);
    getAllSavings(dispatch);
    getAllExpenses(dispatch);
  });

  return (
    <>
      <div>
        <Header />
        <div className="main">
          <div className="naviMain">
            <NavigationLeft />
          </div>

          <div className="route">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/income" element={<Income />} />
              <Route path="/expense" element={<Expense />} />
              <Route path="/saving" element={<Savings />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
