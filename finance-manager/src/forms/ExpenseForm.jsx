import { useDispatch, useSelector } from "react-redux";
import "../Css/Form.css";
import { addExpense } from "../actions/expense.action";
import { getAllExpenses, updateExpenseAfterEdit } from "../utils/expense.utils";
import { addExpenses } from "../services/expense.service";

function ExpenseForm({ closeModal }) {
  const expenseInput = useSelector((state) => state.expenseSlice.expenseInput);

  const editExpenseStatus = useSelector(
    (state) => state.expenseSlice.editExpenseData
  );

  const dispatch = useDispatch();

  const handleExpenseInput = (e) => {
    const { name, value } = e.target;
    dispatch(addExpense({ ...expenseInput, [name]: value }));
  };

  const handleExpenseFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editExpenseStatus) {
        updateExpenseAfterEdit(dispatch, expenseInput);
      } else {
        const submit = await addExpenses(expenseInput);
        if (submit) {
          getAllExpenses(dispatch);
        }
      }
      closeModal();
      dispatch(
        addExpense({
          description: "",
          amount: "",
          category: "",
        })
      );
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  };

  const category = [
    "Housing",
    "Transportation",
    "Food",
    "Entertainment",
    "Health",
    "Shopping",
    "Education",
    "Travel",
    "Miscellaneous",
  ];

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <form onSubmit={handleExpenseFormSubmit}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            placeholder="Enter description"
            value={expenseInput?.description}
            name="description"
            onChange={handleExpenseInput}
          />
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            placeholder="Enter amount"
            value={expenseInput?.amount}
            name="amount"
            onChange={handleExpenseInput}
          />

          <select
            className="category"
            value={expenseInput?.category}
            name="category"
            onChange={handleExpenseInput}
          >
            <option>Select Category</option>
            {category?.map((cat) => {
              return (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              );
            })}
          </select>
          <button type="submit">{editExpenseStatus ? "Edit" : "Add"}</button>
        </form>
      </div>
    </div>
  );
}

export default ExpenseForm;