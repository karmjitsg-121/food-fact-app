import { useNavigate } from "react-router-dom";

function FoodCard({ product }) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/product/${product.code}`)}>
      <h3>{product.product_name}</h3>
      <p>{product.brands}</p>
    </div>
  );
}

export default FoodCard;