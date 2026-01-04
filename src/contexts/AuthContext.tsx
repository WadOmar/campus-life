import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { students, clubs } from "@/data/mockData";

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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for "session"
    const storedUser = localStorage.getItem('mock_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      // 1. Admin Check
      if (email === 'admin@campus.ma') {
        if (password !== 'admin123') {
           return { success: false, error: 'auth.errors.invalid_credentials' };
        }
        const adminUser: User = {
          id: 'admin_1',
          email,
          firstName: 'Admin',
          lastName: 'System',
          role: 'admin'
        };
        setUser(adminUser);
        localStorage.setItem('mock_user', JSON.stringify(adminUser));
        return { success: true };
      }

      // 2. Student Check
      const foundStudent = students.find(s => s.email.toLowerCase() === email.toLowerCase());
      
      if (foundStudent) {
        // Special check for demo manager
        if (foundStudent.email === 'amine.elalami@campus.ma') {
            if (password !== 'manager123') {
                return { success: false, error: 'auth.errors.invalid_credentials' };
            }
        } else {
            // Generic student password
            if (password !== 'student123') {
                return { success: false, error: 'auth.errors.invalid_credentials' };
            }
        }

        // Determine role
        // Check if they manage any club
        const managedClubs = clubs.filter(c => c.managerId === foundStudent.id);
        const role: UserRole = managedClubs.length > 0 ? 'club_manager' : 'student';

        const userUser: User = {
          id: foundStudent.id,
          email: foundStudent.email,
          firstName: foundStudent.firstName,
          lastName: foundStudent.lastName,
          role: role,
          avatar: foundStudent.avatar,
          program: foundStudent.program,
          year: foundStudent.year,
          clubs: foundStudent.clubs
        };

        setUser(userUser);
        localStorage.setItem('mock_user', JSON.stringify(userUser));
        return { success: true };
      }

      return { success: false, error: "Utilisateur non trouvé" };
    } catch (err) {
      return { success: false, error: "Erreur de connexion" };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mock_user');
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
