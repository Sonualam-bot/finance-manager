import { NavLink } from "react-router-dom";
import "../Css/Navigation.css";

import { AiFillGithub } from "react-icons/ai";

function NavigationLeft() {
  return (
    <div className="navigation">
      <div className="nav-child">
        <div>
          <NavLink className="navlink" to="/">
            Home
          </NavLink>
        </div>
        <div>
          <NavLink className="navlink" to="/income">
            Income
          </NavLink>
        </div>
        <div>
          <NavLink className="navlink" to="/saving">
            Saving
          </NavLink>
        </div>
        <div>
          <NavLink className="navlink" to="/expense">
            Expense
          </NavLink>
        </div>
        <div>
          <NavLink
            className="navlink"
            to="https://github.com/Sonualam-bot/finance-manager"
            target="_blank"
          >
            <AiFillGithub className="github" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default NavigationLeft;
