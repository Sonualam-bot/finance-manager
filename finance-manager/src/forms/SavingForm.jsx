import { useDispatch, useSelector } from "react-redux";
import "../Css/Form.css";
import { addSavings } from "../services/saving.service";
import { getAllSavings, updateSavingAfterEdit } from "../utils/saving.util";
import { addSavingsInput } from "../actions/saving.action";

function SavingForm({ closeModal }) {
  const savingInput = useSelector((state) => state.savingSlice.savingInput);

  const editSavingStatus = useSelector(
    (state) => state.savingSlice.editSavingData
  );

  const dispatch = useDispatch();

  const handleSavingInput = (e) => {
    const { name, value } = e.target;
    dispatch(addSavingsInput({ ...savingInput, [name]: value }));
  };

  const handleSavingFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editSavingStatus) {
        updateSavingAfterEdit(dispatch, savingInput);
      } else {
        const submit = await addSavings(savingInput);
        if (submit) {
          getAllSavings(dispatch);
        }
      }

      closeModal();
      dispatch(
        addSavingsInput({
          description: "",
          amount: "",
        })
      );
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <form onSubmit={handleSavingFormSubmit}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            placeholder="Enter description"
            onChange={handleSavingInput}
            value={savingInput?.description}
            name="description"
          />
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            placeholder="Enter amount"
            onChange={handleSavingInput}
            value={savingInput?.amount}
            name="amount"
          />
          <button type="submit">{editSavingStatus ? "Edit" : "Add"}</button>
        </form>
      </div>
    </div>
  );
}

export default SavingForm;
