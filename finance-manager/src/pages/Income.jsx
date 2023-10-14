import { useDispatch, useSelector } from "react-redux";
import "../Css/Table.css";
import { updateIncomeAfterDeletion } from "../utils/income.utils";

function Income() {
  const income = useSelector((state) => state.incomeSlice.incomeDb);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Income</h1>
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
                      <span className="material-symbols-outlined">
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
