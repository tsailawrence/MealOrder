"use client";
import React, { createContext, useContext, ReactNode } from 'react';

// Define a type for the context value
type AuthContextType = {
    accessToken: string;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({ accessToken: '' });

// Context provider component type
type AuthProviderProps = {
    accessToken: string;
    children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, accessToken }) => {
    return (
        <AuthContext.Provider value={{ accessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use the context
export const useAuth = () => useContext(AuthContext);
