import React, { useEffect, useState, useContext } from "react";

const initialState = {
    id: null,
    token: null,
    role: null,
    isLogIn: localStorage.getItem('isLogIn'),
    login: () => { },
    logout: () => { },
};

const AuthContext = React.createContext(initialState);

export const AuthProvider = ({ children }) => {

    const [id, setId] = useState(null);
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [isLogIn, setIsLogIn] = useState(localStorage.getItem('isLogIn'));

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'isLogIn' && (event.newValue === 'false' || event.newValue === 'true' || event.newValue === null)) {
                // window.location.reload();
                window.location.href = '/';
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [isLogIn]);

    useEffect(() => {
        const UserId = localStorage.getItem('UserId');
        const Token = localStorage.getItem('token');
        const UserRole = localStorage.getItem('UserRole');

        setId(UserId);
        setToken(Token);
        setRole(UserRole);
    }, [isLogIn]);

    const login = () => {
        localStorage.removeItem('isLogIn');
        localStorage.setItem('isLogIn', 'true');
        setIsLogIn(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('UserId');
        localStorage.removeItem('UserRole');
        localStorage.removeItem('isLogIn');
        localStorage.setItem('isLogIn', 'false');
        setIsLogIn(false);
    };

    return (
        <AuthContext.Provider value={{ login, logout, id, token, role, isLogIn }}>
            {children}
        </AuthContext.Provider>
    );
}

export const UserAuth = () => {
    return useContext(AuthContext)
}
