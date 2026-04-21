import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../store/savedSlice";

function SavedPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const saved = useSelector(
    (state) => state.saved.items
  );

  if (saved.length === 0) {
    return (
      <div className="app">
        <h1>Saved Items ❤️</h1>
        <p>No saved items</p>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Saved Items ❤️</h1>

      <div className="list">
        {saved.map((item) => (
          <div className="card" key={item.code}>
            <h3>{item.product_name}</h3>

            <p>{item.brands}</p>

            <button
              onClick={() =>
                navigate(`/detail/${item.code}`)
              }
            >
              View
            </button>

            <button
              onClick={() =>
                dispatch(removeItem(item.code))
              }
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedPage;