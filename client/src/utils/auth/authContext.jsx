import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Check if token exists in localStorage on initial load
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('authToken') ? true : false;
    });

    // Run on component mount to set auth based on token
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (token) => {
        if (token) { localStorage.setItem('authToken', token); }
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
    };

    // Get current token
    const getToken = () => {
        return localStorage.getItem('authToken');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, getToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);