import { useState, useEffect } from "react";

/**
 *
 * @param {string} query
 * @param {function} searchFunction
 * @returns {[boolean, Array<Object>, Object]} [loading, data, error]
 */
function useSearch(query, searchFunction) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function doSearch() {
      setLoading(true);
      setError(null);
      if (query && query.length > 0) {
        try {
          const data = await searchFunction(query);
          setData(data);
        } catch (error) {
          setError(error);
        }
      }
      setLoading(false);
    }

    if (query) {
      doSearch();
    } else {
      setData([]);
    }
  }, [query, searchFunction]);

  return [loading, data, error];
}

export default useSearch;
