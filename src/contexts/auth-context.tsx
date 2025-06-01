import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { User } from '@/types/user';

interface AuthContextProps {
    baseUrl: string;
    token: string | null;
    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

    useEffect(() => {
        const cookieToken = Cookies.get('token');
        const cookieUser = Cookies.get('user');

        if (cookieToken && cookieUser) {
            setToken(cookieToken);
            try {
                setUser(JSON.parse(cookieUser));
            } catch (err) {
                console.error('Erro ao parsear user do cookie:', err);
                Cookies.remove('user');
            }
        }
    }, []);

    const login = (newToken: string, userData: User) => {
        setToken(newToken);
        setUser(userData);
        Cookies.set('token', newToken, { expires: new Date(Date.now() + 60 * 60 * 1000) }); // 1 hora
        Cookies.set('user', JSON.stringify(userData), { expires: 7 });
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        Cookies.remove('token');
        Cookies.remove('user');
    };

    return (
        <AuthContext.Provider
            value={{
                baseUrl,
                token,
                user,
                login,
                logout,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um <AuthProvider>');
    }
    return context;
};
