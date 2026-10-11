import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import LoginModal from "../components/auth/LoginModel";
import {
  knowMe,
  loginWithGoogle as doLoginWithGoogle,
  hasToken,
  logOut as doLogout,
} from "../services/authService";
import type { AuthUser, AuthContextValue } from "../types/auth";

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: false,
  logout: () => {},
  requireAuth: () => {},
  loginWithGoogle: async () => ({ id: 0, name: "", email: "" }),
  showLoginModal: () => {},
  hideLoginModal: () => {},
});

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

  const loginWithGoogle = async (
    credential: string,
    directUser?: Partial<AuthUser>
  ): Promise<AuthUser> => {
    const loggedUser = await doLoginWithGoogle(credential, directUser);
    setUser(loggedUser);
    setShowLogin(false);
    return loggedUser;
  };

  const logout = () => {
    doLogout();
    setUser(null);
  };

  const requireAuth = (action?: () => void) => {
    if (user) {
      action?.();
    } else {
      setShowLogin(true);
    }
  };

  const showLoginModal = () => setShowLogin(true);
  const hideLoginModal = () => setShowLogin(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        requireAuth,
        loginWithGoogle,
        showLoginModal,
        hideLoginModal,
      }}
    >
      {children}
      {showLogin && (
        <LoginModal
          visible={showLogin}
          onSuccess={async (credential, directUser) => {
            await loginWithGoogle(credential, directUser);
          }}
          onClose={hideLoginModal}
        />
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
