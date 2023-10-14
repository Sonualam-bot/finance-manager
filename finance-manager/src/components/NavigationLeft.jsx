import { NavLink } from "react-router-dom";
import "../Css/Navigation.css";

function NavigationLeft() {
  return (
    <div className="navigation">
      <NavLink className="navlink" to="/">
        Home
      </NavLink>
      <NavLink className="navlink" to="/income">
        Income
      </NavLink>
      <NavLink className="navlink" to="/saving">
        Saving
      </NavLink>
      <NavLink className="navlink" to="/expense">
        Expense
      </NavLink>
    </div>
  );
}

export default NavigationLeft;
