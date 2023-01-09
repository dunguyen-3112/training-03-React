import { useMemo } from "react";
import { useState, useEffect } from "react";

import * as API from "../utils/api";

/**
 *
 * @param {string} url
 * @param {object} options
 * @returns
 */
export default function useFetch(url, options) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await API.get(url);
                const data = response.data.data;
                setData(data);
                setError(null);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        }
        fetchData();
    }, [url, options]);
    return useMemo(() => [loading, data, error], [loading, data, error]);
}
