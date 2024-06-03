import React, { createContext, useState } from 'react';

// Create a context for user information
export const UserContext = createContext();

// UserContextProvider component to wrap your application
export const UserContextProvider = ({ children }) => {
    // State to hold user information
    const initialUser = localStorage.getItem("userdata")
    const [user, setUser] = useState(
        initialUser ? JSON.parse(initialUser) : undefined
    );
    
    const [loader, setloader] = useState(false)

    return (
        <UserContext.Provider value={
            { user, setUser, loader, setloader }}>
            {children}
        </UserContext.Provider>
    );
};
