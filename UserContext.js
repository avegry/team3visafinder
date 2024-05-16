// UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [loggedInUsername, setLoggedInUsername] = useState(null);

    useEffect(() => {
    }, [loggedInUsername]); // Log whenever loggedInUsername changes

    return (
        <UserContext.Provider value={{ loggedInUsername, setLoggedInUsername }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
