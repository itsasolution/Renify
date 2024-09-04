import React, { createContext, useState } from 'react';

export const UserContext = createContext();

// UserContextProvider component to wrap your application
export const UserContextProvider = ({ children }) => {

    const url = "http://localhost:4000";
    // const url = "https://renify-backend.vercel.app";


    // State to hold user information
    const initialUser = localStorage.getItem("userdata")
    const [user, setUser] = useState(
        initialUser ? JSON.parse(initialUser) : null
    );
    // const [user, setUser] = useState(null);

    const [MyVehicles, setMyVehicles] = useState([]);
    const [loader, setLoader] = useState(true)

    return (
        <UserContext.Provider value={
            { user, url, setUser, loader, setLoader, MyVehicles, setMyVehicles }}>
            {children}
        </UserContext.Provider>
    );
};
