import { useDispatch, useSelector } from "react-redux";
import "../Css/Table.css";
import { updateIncomeAfterDeletion } from "../utils/income.utils";
import { useState } from "react";
import IncomeForm from "../forms/IncomeForm";
import { addIncome, editIncome } from "../actions/income.action";

import jsPDF from "jspdf";
import "jspdf-autotable";

function Income() {
  const income = useSelector((state) => state.incomeSlice.incomeDb);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div>
      <div className="incomeTopBtn">
        <button className="commonBtn" onClick={openModal}>
          Open Income Form
        </button>
        <button className="commonBtn" onClick={generatePDF}>
          Print Income Data
        </button>
      </div>

      {isModalOpen && <IncomeForm closeModal={closeModal} />}

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
            {income?.map((item, index) => {
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
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Income;
