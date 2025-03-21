import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [errorAuth, setErrorAauth] = useState(null);
    return (
        <AuthContext.Provider
            value={{
                authUser,
                setAuthUser,
                loadingAuth,
                setLoadingAuth,
                errorAuth,
                setErrorAauth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
