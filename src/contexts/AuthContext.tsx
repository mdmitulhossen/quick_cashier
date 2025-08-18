import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { User } from '../types';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    adminLogin: (email: string, password: string) => Promise<void>;
    logout: () => void;
    signup: (userData: SignupData) => Promise<void>;
    updateUser: (userData: Partial<User>) => void;
}

interface SignupData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing session on app load
        const checkAuth = async () => {
            try {
                const savedUser = localStorage.getItem('quickcash_user');
                const savedToken = localStorage.getItem('quickcash_token');

                if (savedUser && savedToken) {
                    // In a real app, you'd validate the token with your API
                    setUser(JSON.parse(savedUser));
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                // Clear invalid data
                localStorage.removeItem('quickcash_user');
                localStorage.removeItem('quickcash_token');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            // Mock login - in real app, this would call your API
            const mockUser: User = {
                id: '1',
                email,
                firstName: 'John',
                lastName: 'Doe',
                phone: '+1 (242) 555-0123',
                isEmailVerified: true,
                role: 'customer',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            const mockToken = 'mock-jwt-token-' + Date.now();

            localStorage.setItem('quickcash_user', JSON.stringify(mockUser));
            localStorage.setItem('quickcash_token', mockToken);
            setUser(mockUser);
        } catch (error) {
            throw new Error('Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    const adminLogin = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            // Mock admin login - in real app, this would call your API
            const mockAdminUser: User = {
                id: 'admin-1',
                email,
                firstName: 'Admin',
                lastName: 'User',
                phone: '+1 (242) 555-0000',
                isEmailVerified: true,
                role: 'admin',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            const mockToken = 'admin-jwt-token-' + Date.now();

            localStorage.setItem('quickcash_user', JSON.stringify(mockAdminUser));
            localStorage.setItem('quickcash_token', mockToken);
            setUser(mockAdminUser);
        } catch (error) {
            throw new Error('Admin login failed');
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('quickcash_user');
        localStorage.removeItem('quickcash_token');
        setUser(null);
    };

    const signup = async (userData: SignupData) => {
        setIsLoading(true);
        try {
            // Mock signup - in real app, this would call your API
            const mockUser: User = {
                id: '1',
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                phone: userData.phone,
                isEmailVerified: false,
                role: 'customer',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            const mockToken = 'mock-jwt-token-' + Date.now();

            localStorage.setItem('quickcash_user', JSON.stringify(mockUser));
            localStorage.setItem('quickcash_token', mockToken);
            setUser(mockUser);
        } catch (error) {
            throw new Error('Signup failed');
        } finally {
            setIsLoading(false);
        }
    };

    const updateUser = (userData: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...userData, updatedAt: new Date().toISOString() };
            setUser(updatedUser);
            localStorage.setItem('quickcash_user', JSON.stringify(updatedUser));
        }
    };

    const value: AuthContextType = {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        adminLogin,
        logout,
        signup,
        updateUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
