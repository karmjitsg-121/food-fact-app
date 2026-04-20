import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function DetailPage({ saved, dispatch }) {
  const { barcode } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const isSaved = saved.some((p) => p.code === barcode);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        );

        if (!cancelled) {
          setProduct(res.data.product);
          setLoading(false);
        }
      } catch {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [barcode]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>

      <h2>{product.product_name}</h2>
      <p>{product.brands}</p>

      <button
        onClick={() =>
          dispatch({
            type: isSaved ? "REMOVE" : "ADD",
            product: product,
            code: barcode,
          })
        }
      >
        {isSaved ? "Remove" : "Save"}
      </button>
    </div>
  );
}

export default DetailPage;