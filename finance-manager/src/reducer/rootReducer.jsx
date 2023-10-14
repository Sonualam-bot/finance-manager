import { combineReducers } from "redux";
import { IncomeReducer } from "./IncomeReducer";
import { SavingReducer } from "./SavingReducer";
import { ExpenseReducer } from "./ExpenseReducer";

export const rootReducer = combineReducers({
  incomeSlice: IncomeReducer,
  savingSlice: SavingReducer,
  expenseSlice: ExpenseReducer,
});
