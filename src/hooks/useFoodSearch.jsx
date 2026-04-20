import { useState } from "react";
import axios from "axios";

function useFoodSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchFood = async (query) => {
    if (!query || query.trim() === "") return;

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const response = await axios.get(
        "https://world.openfoodfacts.org/cgi/search.pl",
        {
          params: {
            search_terms: query,
            search_simple: 1,
            action: "process",
            json: 1,
          },
        }
      );

      const products = response.data.products || [];

      const filteredProducts = products.filter(
        (item) =>
          item.product_name &&
          item.product_name.trim() !== ""
      );

      setResults(filteredProducts);
    } catch (err) {
      setError("Failed to fetch data");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    results,
    loading,
    error,
    searchFood,
  };
}

export default useFoodSearch;