import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { addItem, removeItem } from "../store/savedSlice";

function DetailPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const saved = useSelector(
    (state) => state.saved.items
  );

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const isSaved = saved.some(
    (item) => item.code === code
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${code}.json`
        );

        setProduct(res.data.product);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [code]);

  if (loading) return <p>Loading...</p>;

  if (!product) return <p>Product not found</p>;

  return (
    <div className="app">
      <button onClick={() => navigate(-1)}>
        Back
      </button>

      <h1>{product.product_name}</h1>

      <p>{product.brands}</p>

      <img
        src={
          product.image_small_url ||
          "https://via.placeholder.com/150"
        }
        alt={product.product_name}
      />

      <p>
        Calories:{" "}
        {product.nutriments?.[
          "energy-kcal_100g"
        ] || "N/A"}
      </p>

      <p>
        Protein:{" "}
        {product.nutriments?.proteins_100g ||
          "N/A"}
      </p>

      <button
        onClick={() =>
          isSaved
            ? dispatch(removeItem(code))
            : dispatch(addItem(product))
        }
      >
        {isSaved ? "Remove" : "Save"}
      </button>
    </div>
  );
}

export default DetailPage;