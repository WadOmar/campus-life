import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'student' | 'club_manager' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  program?: string;
  year?: number;
  clubs?: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: Record<string, { password: string; user: User }> = {
  'admin@campus.edu': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@campus.edu',
      firstName: 'Marie',
      lastName: 'Dupont',
      role: 'admin',
      avatar: undefined,
    },
  },
  'manager@campus.edu': {
    password: 'manager123',
    user: {
      id: '2',
      email: 'manager@campus.edu',
      firstName: 'Pierre',
      lastName: 'Martin',
      role: 'club_manager',
      avatar: undefined,
      clubs: ['1', '3'],
    },
  },
  'student@campus.edu': {
    password: 'student123',
    user: {
      id: '3',
      email: 'student@campus.edu',
      firstName: 'Sophie',
      lastName: 'Bernard',
      role: 'student',
      avatar: undefined,
      program: 'Informatique',
      year: 3,
      clubs: ['1'],
    },
  },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('campus_life_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const userData = mockUsers[email.toLowerCase()];
    
    if (!userData) {
      setIsLoading(false);
      return { success: false, error: 'auth.errors.invalid_credentials' };
    }
    
    if (userData.password !== password) {
      setIsLoading(false);
      return { success: false, error: 'auth.errors.invalid_credentials' };
    }
    
    setUser(userData.user);
    localStorage.setItem('campus_life_user', JSON.stringify(userData.user));
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('campus_life_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
