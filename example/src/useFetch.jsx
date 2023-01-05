import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useFetch(url) {

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(url)
            const data = response.data;
            setData(data)
            setError(null)
            setLoading(false)
        }
        fetchData();
    }, [url]);
    return [data, error, loading]
}
