import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const login = (data) => {
        setToken(data.token);
        setUser(data.user);

        localStorage.setItem("token", data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
    };

    const logout = () => {
        setToken(null);
        setUser(null);

        localStorage.removeItem("token");
        localStorage.removeItem('user');
    }
    return (
    <AuthContext.Provider
        value={{
            user,
            token,
            login,
            logout
        }}
    >
        {children}
    </AuthContext.Provider>
    );
}

export const useAuth=()=>{
    return useContext(AuthContext)
}
