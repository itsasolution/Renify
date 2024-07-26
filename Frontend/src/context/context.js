import React, { createContext, useState } from 'react';

export const UserContext = createContext();

// UserContextProvider component to wrap your application
export const UserContextProvider = ({ children }) => {

    const url = "http://localhost:4000";

    // State to hold user information
    const initialUser = localStorage.getItem("userdata")
    const [user, setUser] = useState(
        initialUser ? JSON.parse(initialUser) : null
    );
    // const [user, setUser] = useState(null);

    const [MyVehicles, setMyVehicles] = useState([]);
    const [loader, setloader] = useState(false)

    return (
        <UserContext.Provider value={
            { user, url, setUser, loader, setloader, MyVehicles, setMyVehicles }}>
            {children}
        </UserContext.Provider>
    );
};
