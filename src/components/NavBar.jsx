import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function NavBar() {
  const count = useSelector(
    (state) => state.saved.items.length
  );

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