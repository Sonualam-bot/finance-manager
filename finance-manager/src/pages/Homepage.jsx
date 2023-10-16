import { useSelector } from "react-redux";
import "../Css/Homepage.css";

function Homepage() {
  const income = useSelector((state) => state.incomeSlice.incomeDb);
  const expense = useSelector((state) => state.expenseSlice.expenseDb);
  const saving = useSelector((state) => state.savingSlice.savingDb);

  const totalIncome = income?.reduce((acc, curr) => acc + curr.amount, 0);
  const totalSavings = saving?.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = expense?.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="homepage">
      <h2>Welcome to Your Personal Finance Manager Web app</h2>
      <div className="parentHome">
        <div className="childHome">
          <h4>₹ {totalIncome}</h4>
          <h3>Total Income </h3>
        </div>
        <div className="childHome">
          <h4>₹ {totalSavings}</h4>
          <h3>Total Saving </h3>
        </div>
        <div className="childHome">
          <h4>₹ {totalExpenses}</h4>
          <h3>Total Expense </h3>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
