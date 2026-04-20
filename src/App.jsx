import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
          query
        )}&search_simple=1&action=process&json=1`
      );

      const data = await res.json();

      const filtered = data.products.filter(
        (item) => item.product_name && item.product_name.trim() !== ""
      );

      setResults(filtered);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>FoodFacts 🍎</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search food..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {!searched && <p>Search for food 🍎</p>}

      {loading && <p>Loading...</p>}

      {!loading && searched && results.length === 0 && (
        <p>No results found 😢</p>
      )}

      <div className="list">
        {results.map((item) => (
          <div className="card" key={item.code}>
            <img
              src={
                item.image_small_url ||
                "https://via.placeholder.com/100"
              }
              alt={item.product_name}
            />

            <h3>{item.product_name}</h3>
            <p>{item.brands || "Unknown Brand"}</p>
            <p>
              Calories:{" "}
              {item.nutriments?.["energy-kcal_100g"] || "N/A"}
            </p>
            <p>
              Protein: {item.nutriments?.proteins_100g || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Saved() {
  return (
    <div className="app">
      <h1>Saved Items ❤️</h1>
      <p>No saved items yet.</p>
    </div>
  );
}

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/saved">Saved</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
    </>
  );
}

export default App;