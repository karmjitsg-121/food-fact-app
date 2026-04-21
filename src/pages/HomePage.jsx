import SearchBar from "../components/SearchBar";
import FoodList from "../components/FoodList";
import ErrorMessage from "../components/ErrorMessage";
import useFoodSearch from "../hooks/useFoodSearch";

function HomePage() {
  const {
    results,
    loading,
    error,
    searchFood,
  } = useFoodSearch();

  return (
    <div className="app">
      <h1>FoodFacts 🍎</h1>

      <SearchBar onSearch={searchFood} />

      {loading && <p>Loading...</p>}

      {error && (
        <ErrorMessage message={error} />
      )}

      {!loading &&
        !error &&
        results.length === 0 && (
          <p>Search for food items 🍔</p>
        )}

      {results.length > 0 && (
        <FoodList products={results} />
      )}
    </div>
  );
}

export default HomePage;