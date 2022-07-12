export const request = async (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body: any = null,
    headers: any = {},
) => {
    try {
        if (body) {
            body = JSON.stringify(body);
            headers['Content-Type'] = 'application/json';
        }
        const res: Response = await fetch(url, { method, body, headers });
        const data = await res.json();

        return data;
    } catch (e) {
        console.log(e);
    }
};
