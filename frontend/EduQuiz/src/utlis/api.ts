const BASE_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = "eq_token";

export const tokenStore = {
    get: () => localStorage.getItem(TOKEN_KEY),
    set: (t:string) => localStorage.setItem(TOKEN_KEY, t),
    clear: () => localStorage.removeItem(TOKEN_KEY)
};

export class ApiError extends Error {
    status: number;

    constructor(status: number, message: string){
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}


export async function apiFetch<T>(path: string, options: RequestInit ={}): Promise<T> {
    const url = `${BASE_URL}${path}`;

    const headers = new Headers(options.headers);
    headers.set("Content-Type", "application/json");

    // Check token that still avaiable in localStorage
    const token = tokenStore.get();
    if(token){
        headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(url, {...options, headers});

    if(!response.ok){
        throw new ApiError(response.status, `API lỗi ${response.status}`);
    }
    return (await response.json()) as T;
}
