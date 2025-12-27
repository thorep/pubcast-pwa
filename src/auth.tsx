import React, { createContext, useContext, useMemo, useState } from "react";

type AuthContextValue = {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    loginAsGuest: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const value = useMemo(
        () => ({
            isAuthenticated,
            setIsAuthenticated,
            loginAsGuest: () => setIsAuthenticated(true),
        }),
        [isAuthenticated],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}
