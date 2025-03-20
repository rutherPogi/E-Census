import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Check if token exists in localStorage on initial load
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('authToken') ? true : false;
    });

    // Add state for user data
    const [userData, setUserData] = useState(() => {
        const savedUserData = localStorage.getItem('userData');
        return savedUserData ? JSON.parse(savedUserData) : null;
    });

    // Run on component mount to set auth based on token
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (token, user) => {
        if (token) { localStorage.setItem('authToken', token); }

        if (user) {
            localStorage.setItem('userData', JSON.stringify(user));
            setUserData(user);
        }

        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        setIsAuthenticated(false);
        setUserData(null);
    };

    // Get current token
    const getToken = () => {
        return localStorage.getItem('authToken');
    };

    // Get user data
    const getUserData = () => {
        return userData;
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userData, login, logout, getToken, getUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);