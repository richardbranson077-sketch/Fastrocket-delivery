const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY = process.env.API_SECRET_KEY;

interface ApiError {
    message: string;
    status: number;
}

export async function fetchFromBackend<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    if (!API_BASE_URL) {
        throw new Error('API_BASE_URL is not defined');
    }

    const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        ...options.headers,
    };

    try {
        const response = await fetch(url, {
            ...options,
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const error: ApiError = {
                message: errorData.message || 'An error occurred while fetching data',
                status: response.status,
            };
            throw error;
        }

        return response.json();
    } catch (error) {
        console.error('API Request Failed:', error);
        throw error;
    }
}
