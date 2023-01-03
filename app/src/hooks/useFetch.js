import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../data/constants";

function useFetch({ url, method, json }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetdata() {
            try {
                let data;
                switch (method) {
                    case "GET":
                        data = await axios.get(API_ENDPOINT + url);
                        setData(data);
                        setLoading(false);
                        break;
                    case "POST":
                        if (json === undefined)
                            return [
                                null,
                                false,
                                new Error("Data is undefined"),
                            ];
                        data = await axios.post(API_ENDPOINT + url, json, {
                            headers: {
                                "Content-type": "application/json",
                            },
                        });
                        setData(data);
                        setLoading(false);
                        break;
                    default:
                        console.log(url);
                        break;
                }
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }

        //fetdata();
        console.log(json);
    }, [json]);

    a

    return [data, loading, error];
}

export default useFetch;
