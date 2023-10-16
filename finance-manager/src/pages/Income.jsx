import { useDispatch, useSelector } from "react-redux";
import "../Css/Table.css";
import { updateIncomeAfterDeletion } from "../utils/income.utils";
import { useState } from "react";
import IncomeForm from "../forms/IncomeForm";
import { addIncome, editIncome } from "../actions/income.action";

import jsPDF from "jspdf";
import "jspdf-autotable";
import { incomeCategories } from "../utils/Categories";

function Income() {
  const income = useSelector((state) => state.incomeSlice.incomeDb);
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

  const handleEditIncome = (item) => {
    openModal();
    dispatch(editIncome(true));
    dispatch(addIncome(item));
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    const columns = ["Sn. No.", "Description", "Amount"];
    const data = income.map((item, index) => [
      index + 1,
      item.description,
      item.amount,
    ]);

    doc.autoTable({
      head: [columns],
      body: data,
    });

    doc.save("income.pdf");
  };

  const sortedIncomeOnClick = isChecked
    ? [...income].sort((a, b) => a.amount - b.amount)
    : [...income];

  const sortByCategory = [...sortedIncomeOnClick]?.filter((income) =>
    income.category.includes(selectedCategory)
  );

  const totalExpense = sortedIncomeOnClick?.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  return (
    <div>
      <div className="incomeTopBtn">
        <button className="commonBtn" onClick={openModal}>
          Open Income Form
        </button>
        <button className="commonBtn" onClick={generatePDF}>
          Print Income Data
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
            {incomeCategories?.map((categories) => {
              return (
                <option key={categories} value={categories}>
                  {categories}
                </option>
              );
            })}
          </select>
        </fieldset>
      </div>

      {isModalOpen && <IncomeForm closeModal={closeModal} />}

      {sortByCategory.length === 0 ? (
        <div>
          <h2>Loading Data....</h2>
        </div>
      ) : (
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
              {sortByCategory?.map((item, index) => {
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
                          onClick={() => handleEditIncome(item)}
                        >
                          edit_note
                        </span>
                        <span
                          className="material-symbols-outlined"
                          onClick={() =>
                            updateIncomeAfterDeletion(dispatch, item._id)
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
      )}
    </div>
  );
}

export default Income;
