import type { AuthResponse, AuthUser } from "../types/auth";
import { apiFetch, tokenStore } from "../utlis/api";

export async function loginWithGoogle(credential: string): Promise<AuthUser> {
// Promise là dữ liệu mà function này sẽ trả về 
    const data = await apiFetch<AuthResponse>("/auth/google",{
        method: "Post",
        body: JSON.stringify(credential)
    }) 

    tokenStore.set(data.token);
    return data.user;
}

// Reload trang muốn giữ session -> knowMe 
export async function knowMe(): Promise<AuthUser> { // Ko trả về các interface có token
    return apiFetch<AuthUser> ("/auth/me");
}

export function hasToken(): boolean {
    return tokenStore.get !== null;
}

export function logOut(): void {
    tokenStore.clear();
}

