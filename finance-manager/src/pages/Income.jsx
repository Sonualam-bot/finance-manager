import { useDispatch, useSelector } from "react-redux";
import "../Css/Table.css";
import { updateIncomeAfterDeletion } from "../utils/income.utils";
import { useState } from "react";
import IncomeForm from "../forms/IncomeForm";
import { addIncome, editIncome } from "../actions/income.action";

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

  return (
    <div>
      <h1>Income</h1>
      <button onClick={openModal}>Open Income Form</button>

      {isModalOpen && <IncomeForm closeModal={closeModal} />}

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
            {income?.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.description}</td>
                  <td>{item.amount}</td>
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
