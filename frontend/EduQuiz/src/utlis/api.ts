const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:8080";
const TOKEN_KEY = "eq_token";

let inMemoryToken: string | null = null;

export const tokenStore = {
  get: () => {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem(TOKEN_KEY);
    }
    return inMemoryToken;
  },
  set: (t: string) => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(TOKEN_KEY, t);
    }
    inMemoryToken = t;
  },
  clear: () => {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
    }
    inMemoryToken = null;
  },
};

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${path}`;

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  const token = tokenStore.get();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    throw new ApiError(response.status, `API lỗi ${response.status}`);
  }
  return (await response.json()) as T;
}
