import { useDispatch, useSelector } from "react-redux";
import "../Css/Form.css";
import "../Css/Table.css";
import { addIncome } from "../actions/income.action";
import { createIncome } from "../services/income.service";
import { getAllIncomeData, updateIncomeAfterEdit } from "../utils/income.utils";

function IncomeForm({ closeModal }) {
  const incomeInput = useSelector((state) => state.incomeSlice.incomeInput);

  const editIncomeStatus = useSelector(
    (state) => state.incomeSlice.editIncomeData
  );

  const dispatch = useDispatch();

  const handleIncomeInput = (e) => {
    const { name, value } = e.target;
    console.log({ ...incomeInput, [name]: value });
    dispatch(addIncome({ ...incomeInput, [name]: value }));
  };

  const handleIncomeFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editIncomeStatus) {
        updateIncomeAfterEdit(dispatch, incomeInput);
      } else {
        const submit = await createIncome(incomeInput);
        if (submit) {
          getAllIncomeData(dispatch);
        }
      }

      closeModal();
      dispatch(
        addIncome({
          description: "",
          amount: "",
          category: "",
        })
      );
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  };

  const incomeCategories = [
    "Salary",
    "Freelance",
    "Business Income",
    "Investments",
    "Rent",
    "Interest",
    "Other",
  ];

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <form onSubmit={handleIncomeFormSubmit}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            placeholder="Enter description"
            value={incomeInput?.description}
            name="description"
            onChange={handleIncomeInput}
          />
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            placeholder="Enter amount"
            value={incomeInput?.amount}
            name="amount"
            onChange={handleIncomeInput}
          />
          <select
            name="category"
            value={incomeInput?.category}
            onChange={handleIncomeInput}
            className="select"
          >
            <option>Select a category</option>
            {incomeCategories?.map((category) => {
              return (
                <option value={category} key={category}>
                  {category}
                </option>
              );
            })}
          </select>
          <button className="submitBTn" type="submit">
            {editIncomeStatus ? "Edit" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default IncomeForm;
