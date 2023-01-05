import { useState, useEffect } from "react";

function useFetch(url, options) {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {

        };
        fetchData();
    }, []);

    return { response, error, isLoading };
}

export default useFetch;
