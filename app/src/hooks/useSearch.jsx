import { useState, useEffect } from "react";

function useSearch(query, searchFunction) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function doSearch() {
      setLoading(true);
      setError(null);
      if (query && query.length > 0) {
        try {
          const results = await searchFunction(query);
          setResults(results);
        } catch (error) {
          setError(error);
        }
      }
      setLoading(false);
    }

    if (query) {
      doSearch();
    } else {
      setResults([]);
    }
  }, [query, searchFunction]);

  return [loading, results, error];
}

export default useSearch;
