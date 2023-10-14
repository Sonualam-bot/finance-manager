import { useDispatch, useSelector } from "react-redux";
import "../Css/Table.css";
import { updateSavingAfterDeletion } from "../utils/saving.util";
import { useState } from "react";
import SavingForm from "../forms/SavingForm";
import { addSavingsInput, editSaving } from "../actions/saving.action";

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

  return (
    <div>
      <h1>Saving</h1>

      <button onClick={openModal}>Open Income Form</button>

      {isModalOpen && <SavingForm closeModal={closeModal} />}

      <div className="tableData">
        <table>
          <thead>
            <tr>
              <th>Sn. No.</th>
              <th>Description</th>
              <th>Amount</th>
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
