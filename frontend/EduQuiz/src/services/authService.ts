import type { AuthResponse, AuthUser } from "../types/auth";
import { apiFetch, tokenStore } from "../utlis/api";

const USER_KEY = "eq_user";
let inMemoryUser: AuthUser | null = null;

export function getUserStore(): AuthUser | null {
  if (typeof localStorage !== "undefined") {
    const raw = localStorage.getItem(USER_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        // ignore
      }
    }
  }
  return inMemoryUser;
}

export function setUserStore(user: AuthUser | null) {
  inMemoryUser = user;
  if (typeof localStorage !== "undefined") {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }
}

/**
 * Giải mã Google JWT Token an toàn đa nền tảng
 */
export function decodeGoogleJwt(token: string): Partial<AuthUser> | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    
    let raw = "";
    if (typeof atob === "function") {
      raw = atob(base64);
    } else {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      let str = String(base64).replace(/=+$/, "");
      for (let bc = 0, bs = 0, buffer = 0, idx = 0; (buffer = str.charCodeAt(idx++)); ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4) ? (raw += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6)))) : 0) {
        buffer = chars.indexOf(String.fromCharCode(buffer));
      }
    }

    const jsonStr = decodeURIComponent(
      raw
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    const payload = JSON.parse(jsonStr);
    return {
      name: payload.name || payload.given_name || "Học viên Google",
      email: payload.email || "student@gmail.com",
      avatar: payload.picture,
    };
  } catch (e) {
    return null;
  }
}

/**
 * Đăng nhập với Google và lưu hồ sơ người dùng
 */
export async function loginWithGoogle(
  credential: string,
  directUser?: Partial<AuthUser>
): Promise<AuthUser> {
  const decoded = decodeGoogleJwt(credential);
  const activeUser: AuthUser = {
    id: directUser?.id || Date.now(),
    name: directUser?.name || decoded?.name || "Học viên Google",
    email: directUser?.email || decoded?.email || "student@eduquiz.vn",
    avatar: directUser?.avatar || decoded?.avatar,
  };

  try {
    const data = await apiFetch<AuthResponse>("/auth/google", {
      method: "POST",
      body: JSON.stringify(credential),
    });
    tokenStore.set(data.token);
    setUserStore(data.user);
    return data.user;
  } catch {
    // Nếu backend chưa triển khai endpoint /auth/google, lưu hồ sơ Google thật vào local storage/memory
    tokenStore.set(credential || "google-auth-token");
    setUserStore(activeUser);
    return activeUser;
  }
}

export async function knowMe(): Promise<AuthUser> {
  try {
    return await apiFetch<AuthUser>("/auth/me");
  } catch {
    const cached = getUserStore();
    if (cached) return cached;
    throw new Error("Chưa đăng nhập");
  }
}

export function hasToken(): boolean {
  return tokenStore.get() !== null || getUserStore() !== null;
}

export function logOut(): void {
  tokenStore.clear();
  setUserStore(null);
}
