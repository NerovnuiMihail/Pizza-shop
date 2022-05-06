import { useState, useCallback } from "react";


function useApiData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getRequest = useCallback(async(url) => {
    
        try {
            setLoading(true);
            const request = await fetch(url);
            const response = await request.json();
            setLoading(false);
            setData(response);

        } catch (error) {
            setError(true);
            setLoading(false);
            throw new Error('Беда! Не работает!');
        }

    }, [])

    return [
        data,
        loading,
        error,
        getRequest
    ];
}

export default useApiData;