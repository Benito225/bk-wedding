"use server";
export async function fetchData(url: string, method = 'GET', body: any = null, token: any = null) {

    const headers: any = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const options: any = {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
        cache: 'no-store'
    };

    const endpoint = process.env.BACKEND_API_ENDPOINT+url;

    try {
        const response = await fetch(endpoint, options);
        if (!response.ok) {
            throw Error('Une erreur inattendue a survénu. Veuillez réessayer SVP.');
        }
        return response.json();
    } catch (error: any) {
        throw Error(`Erreur survénue : ${error.message}`);
    }
}
