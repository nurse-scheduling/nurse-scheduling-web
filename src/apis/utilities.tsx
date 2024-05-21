import {useEffect, useState} from "react";

export async function postFetch(url: string, payload: any, credentials?: string | null) {
    const headers: { [key: string]: string } = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
    };

    if (credentials) {
        headers['Authorization'] = `Basic ${credentials}`;
    }

    const requestOptions = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
    });

    const response = await requestOptions.json();
    if (requestOptions.status === 200) {
        return response;
    } else if (requestOptions.status === 400) {
        throw new Error(response.message || "Bad Request");
    } else if (requestOptions.status === 401) {
        throw new Error(response.message || "Unauthorized");
    } else if (requestOptions.status === 403) {
        throw new Error(response.message || "Forbidden");
    } else {
        throw new Error(response.message || "Something went wrong");
    }
}
export const useFetch = (url: string, credentials?: string | null) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<any>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        const fetchUrl = async () => {
            setIsLoading(true);
            try {
                const headers: { [key: string]: string } = {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                };

                if (credentials) {
                    headers['Authorization'] = `Basic ${credentials}`;
                }
                const requestOptions = {
                    method: "GET",
                    headers: headers,
                };
                const response = await fetch(url, requestOptions);
                if (response.status === 400) {
                    setError("Bad Request");
                }
                if (response.status === 401) {
                    setError("Unauthorized");
                }
                if (!response.ok) {
                    setError(`Request failed with status ${response.status}`);
                }
                const responseData = await response.json();
                setData(responseData);
            } catch (error: any) {
                console.log(error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (url) {
            fetchUrl();
        }

    }, [url, credentials]);

    return { data, isLoading, error };
};

export async function patchFetch(url: string, payload: any, credentials?: string | null) {
    const headers: { [key: string]: string } = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
    };

    if (credentials) {
        headers['Authorization'] = `Basic ${credentials}`;
    }

    const requestOptions = await fetch(url, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(payload),
    });

    const response = await requestOptions.json();
    if (requestOptions.status === 200) {
        return response;
    } else if (requestOptions.status === 400) {
        throw new Error("Bad Request");
    } else if (requestOptions.status === 401) {
        throw new Error("Unauthorized");
    } else if (requestOptions.status === 403) {
        throw new Error("Forbidden");
    } else {
        throw new Error("Something went wrong");
    }
}

