import FoodCard from "./FoodCard";

function FoodList({ products }) {
  return (
    <div>
      {products.map((p) => (
        <FoodCard key={p.code} product={p} />
      ))}
    </div>
  );
}

export default FoodList;