import { createContext, useEffect, useState, type ReactNode } from "react";
import LoginModal from "../components/auth/LoginModel";

import {
    knowMe,
    loginWithGoogle,
    hasToken,
    logOut as doLogout,
} from "../services/authService";
import type { AuthUser, AuthContextValue } from "../types/auth";

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        if (!hasToken()) {
            setLoading(false);
            return;
        }
        knowMe()
            .then(setUser)
            .catch(() => doLogout())
            .finally(() => setLoading(false));
    }, []);
    const handleGoogleSuccess = async (credential: string) => {
        try {
            const u = await loginWithGoogle(credential);
            setUser(u);
            setShowLogin(false);
        } catch {
            alert("Đăng nhập thất bại, thử lại nhé");
        }
    };

    const logout = () => {
        doLogout();
        setUser(null);
    };

    const requireAuth = (action?: () => void) => {
        if (user) action?.();
        else setShowLogin(true);
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout, requireAuth }}>
            {children}

            {showLogin && !user && (
                <LoginModal
                    onSuccess={handleGoogleSuccess}
                    onClose={() => setShowLogin(false)}
                />
            )}
        </AuthContext.Provider>
    );
}
