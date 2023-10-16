import { useDispatch, useSelector } from "react-redux";
import "../Css/Table.css";
import { updateSavingAfterDeletion } from "../utils/saving.util";
import { useState } from "react";
import SavingForm from "../forms/SavingForm";
import { addSavingsInput, editSaving } from "../actions/saving.action";

import jsPDF from "jspdf";
import "jspdf-autotable";

function Savings() {
  const saving = useSelector((state) => state.savingSlice.savingDb);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditSaving = (item) => {
    openModal();
    dispatch(editSaving(true));
    dispatch(addSavingsInput(item));
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    const columns = ["Sn. No.", "Description", "Amount", "Category"];
    const data = saving.map((item, index) => [
      index + 1,
      item.description,
      item.amount,
      item.category,
    ]);

    doc.autoTable({
      head: [columns],
      body: data,
    });

    doc.save("saving.pdf");
  };

  return (
    <div>
      <div className="savingTop">
        <button className="commonBtn" onClick={openModal}>
          Open Income Form
        </button>
        <button className="commonBtn" onClick={generatePDF}>
          Print Saving Data
        </button>
      </div>

      {isModalOpen && <SavingForm closeModal={closeModal} />}

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
            {saving?.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.description}</td>
                  <td>{item.amount}</td>
                  <td>{item.category}</td>
                  <td>
                    {" "}
                    {new Date(item?.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td>
                    <div className="tableBtn">
                      <span
                        className="material-symbols-outlined"
                        onClick={() => handleEditSaving(item)}
                      >
                        edit_note
                      </span>
                      <span
                        className="material-symbols-outlined"
                        onClick={() =>
                          updateSavingAfterDeletion(dispatch, item._id)
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

export default Savings;
