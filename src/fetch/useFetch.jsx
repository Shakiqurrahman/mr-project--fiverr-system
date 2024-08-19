import { useEffect, useState } from 'react';
import { configApi } from "../libs/configApi";
import fetchData from 'data-fetch-ts';

export const useFetchData = ({ endpoint, token }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDataFromAPI = async () => {
            if (!token) {
                setError("Token is needed");
                setLoading(false);
                return;
            }

            try {
                const fullEndpoint = `${configApi.api}${endpoint}`;
                const res = await fetchData({ endpoint: fullEndpoint, token });
                setData(res);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDataFromAPI();
    }, [endpoint, token]); // Dependencies - refetch when these change

    return { data, loading, error };
};
