import * as React from "react";
import type {User} from "../types/User.ts";
import {authProvider} from "../services/DIContainer.ts";

export const AuthContext = React.createContext<{
    user: User | null;
    login: (username: string, password: string) => Promise<boolean>;
    register: (username: string, email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    loading: boolean;
}>({
    user: null,
    login: async () => false,
    register: async () => false,
    logout: async () => {},
    loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const checkAuth = async () => {
            const currentUser = await authProvider.getCurrentUser();
            setUser(currentUser);
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        const loggedUser = await authProvider.login(username, password);
        if (loggedUser) {
            setUser(loggedUser);
            return true;
        }
        return false;
    };

    const register = async (username: string, email: string, password: string): Promise<boolean> => {
        const newUser = await authProvider.register(username, email, password);
        if (newUser) {
            setUser(newUser);
            return true;
        }
        return false;
    };

    const logout = async (): Promise<void> => {
        await authProvider.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};