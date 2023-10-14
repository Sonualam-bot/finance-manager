import { useDispatch, useSelector } from "react-redux";
import "../Css/Table.css";
import { updateExpenseAfterDeletion } from "../utils/expense.utils";
import { useState } from "react";
import ExpenseForm from "../forms/ExpenseForm";
import { addExpense, editExpense } from "../actions/expense.action";

import jsPDF from "jspdf";
import "jspdf-autotable";

function Expense() {
  const expense = useSelector((state) => state.expenseSlice.expenseDb);

  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div>
      <div className="expenseTopBtn">
        <button className="commonBtn" onClick={openModal}>
          Open expense Form
        </button>
        <button className="commonBtn" onClick={generatePDF}>
          Print Expense Data
        </button>
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
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {expense?.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.description}</td>
                  <td>{item.amount}</td>
                  <td>{item.category}</td>
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
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Expense;
