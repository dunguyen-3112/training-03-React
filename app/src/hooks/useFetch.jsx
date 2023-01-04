import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINT } from '../data/constants';

function useFetch(url, options) {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await axios(API_ENDPOINT + url, options);
                setResponse(res.data);
            } catch (err) {
                setError(err);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [url, options]);

    return { response, error, isLoading };
}

export default useFetch;
