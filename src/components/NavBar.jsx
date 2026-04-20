import { NavLink } from "react-router-dom";

function NavBar({ count }) {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/saved">
        Saved {count > 0 && <span>({count})</span>}
      </NavLink>
    </nav>
  );
}

export default NavBar;