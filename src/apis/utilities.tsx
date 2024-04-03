
export async function postFetch(url: string, payload: any, credentials?: string) {
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
        throw new Error("Bad Request");
    } else if (requestOptions.status === 401) {
        throw new Error("Unauthorized");
    } else if (requestOptions.status === 403) {
        throw new Error("Forbidden");
    } else {
        throw new Error("Something went wrong");
    }
}

