import { useState, useEffect } from "react";

function useSearch(query, searchFunction) {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function doSearch() {
            setLoading(true);
            setError(null);

            try {
                const results = await searchFunction(query);
                setResults(results);
            } catch (error) {
                setError(error);
            }

            setLoading(false);
        }

        if (query) {
            doSearch();
        } else {
            setResults([]);
        }
    }, [query, searchFunction]);

    return { results, loading, error };
}

export default useSearch;
