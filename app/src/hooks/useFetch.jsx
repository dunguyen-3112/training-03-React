import { useState, useEffect } from "react";

import * as API from "../utils/api";

/**
 *
 * @param {string} url
 * @param {Array<[boolean, Object, Object]>}
 * @returns
 */
export default function useFetch(url, options) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await API.get(url);
        const data = response.data;
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchData();
  }, [url, options]);
  return [loading, data, error];
}
