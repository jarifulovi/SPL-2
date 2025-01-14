import React, { useState, useEffect } from 'react';
import AuthApi from '../../services/AuthApi';
import { AuthContext } from '../../utils/AuthContext';


const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const email = localStorage.getItem('email');
                if (email) {
                    const result = await AuthApi.isAuthenticated(email);
                    if (result.success) {
                        setIsAuthenticated(true);
                    } else {
                        console.warn("Authentication failed:", result.message);
                        setIsAuthenticated(false);
                    }
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
