import { useDispatch, useSelector } from "react-redux";
import "../Css/Table.css";
import { updateExpenseAfterDeletion } from "../utils/expense.utils";
import { useState } from "react";
import ExpenseForm from "../forms/ExpenseForm";
import { addExpense, editExpense } from "../actions/expense.action";

import jsPDF from "jspdf";
import "jspdf-autotable";
import { expenseCategories } from "../utils/Categories";

function Expense() {
  const expense = useSelector((state) => state.expenseSlice.expenseDb);

  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditExpense = (item) => {
    openModal();
    dispatch(editExpense(true));
    dispatch(addExpense(item));
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    const columns = ["Sn. No.", "Description", "Amount", "Category"];
    const data = expense.map((item, index) => [
      index + 1,
      item.description,
      item.amount,
      item.category,
    ]);

    doc.autoTable({
      head: [columns],
      body: data,
    });

    doc.save("expense.pdf");
  };

  const sortedExpenseOnClick = isChecked
    ? [...expense].sort((a, b) => a.amount - b.amount)
    : [...expense];

  const sortByExpense = [...sortedExpenseOnClick]?.filter((expense) =>
    expense.category.includes(selectedCategory)
  );

  const totalExpense = sortedExpenseOnClick?.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  console.log(totalExpense);

  return (
    <div>
      <div className="expenseTopBtn">
        <button className="commonBtn" onClick={openModal}>
          Open expense Form
        </button>
        <button className="commonBtn" onClick={generatePDF}>
          Print Expense Data
        </button>

        <fieldset>
          <legend>Sort & Filter</legend>
          <div>
            <input
              type="checkbox"
              value="asc"
              onChange={() => setIsChecked(!isChecked)}
            />
            Amount
          </div>

          <select
            name="category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {expenseCategories?.map((categories) => {
              return (
                <option key={categories} value={categories}>
                  {categories}
                </option>
              );
            })}
          </select>
        </fieldset>
      </div>

      {isModalOpen && <ExpenseForm closeModal={closeModal} />}

      <div className="tableData">
        <table>
          <thead>
            <tr>
              <th>Sn. No.</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {sortByExpense?.map((item, index) => {
              console.log(item);
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.description}</td>
                  <td>₹ {item.amount}</td>
                  <td>{item.category}</td>
                  <td>
                    {" "}
                    {new Date(item?.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td>
                    <div className="tableBtn">
                      <span
                        className="material-symbols-outlined"
                        onClick={() => handleEditExpense(item)}
                      >
                        edit_note
                      </span>
                      <span
                        className="material-symbols-outlined"
                        onClick={() =>
                          updateExpenseAfterDeletion(dispatch, item._id)
                        }
                      >
                        delete
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
            <tr>
              {" "}
              <td>
                <h3>Total Expense:- </h3>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>₹ {totalExpense}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Expense;
