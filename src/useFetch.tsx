// Custom useFetch hook
import {useEffect, useMemo, useRef, useState} from "react";

export default function useFetch(url, options) {
    const controllerRef = useRef(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const memoizedUrl = useMemo(() => url, [url]);

    useEffect(() => {
        setLoading(true); // Set loading state to true before fetch

        controllerRef.current = new AbortController();

        const fetchData = async () => {
            const { signal } = controllerRef.current;

            try {
                const response = await fetch(memoizedUrl, { ...options, signal });
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false); // Set loading state to false after fetch
            }
        };

        fetchData();

        return () => {
            if (controllerRef.current) {
                controllerRef.current.abort();
            }
        };
    }, [memoizedUrl, options, setData, setError]);

    return { loading, error, data };
}
