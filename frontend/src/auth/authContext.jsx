import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem("userId") !== null
    );

    useEffect(() => {
        const checkAuth = () => {
            setIsAuthenticated(localStorage.getItem("userId") !== null);
        };

        window.addEventListener("storage", checkAuth);
        return () => window.removeEventListener("storage", checkAuth);
    }, []);

    const login = (userId) => {
        localStorage.setItem("userId", userId);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("userId");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};