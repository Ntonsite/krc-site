
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

// Define user roles
export type UserRole = 'super-admin' | 'admin';

// User interface
export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
}

// Auth context interface
interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  addUser: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Initialize with default admin
  useEffect(() => {
    // Check local storage for user data
    const storedUser = localStorage.getItem('krc_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
      // Set up default admin if no users exist
      const usersString = localStorage.getItem('krc_users');
      if (!usersString) {
        const defaultAdmin = {
          id: '1',
          email: 'tonyborady@gmail.com',
          name: 'Admin',
          role: 'super-admin' as UserRole
        };
        
        const defaultUsers = [
          {
            id: '1',
            email: 'tonyborady@gmail.com',
            password: '1234', // In a real app, this should be hashed
            name: 'Admin',
            role: 'super-admin' as UserRole
          }
        ];
        
        localStorage.setItem('krc_users', JSON.stringify(defaultUsers));
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Get users from localStorage
      const usersString = localStorage.getItem('krc_users');
      if (!usersString) {
        toast({
          title: "Error",
          description: "User database not found.",
          variant: "destructive",
        });
        setIsLoading(false);
        return false;
      }

      const users = JSON.parse(usersString);
      const user = users.find((u: any) => u.email === email && u.password === password);
      
      if (user) {
        // Remove password from user object before storing in state
        const { password, ...safeUser } = user;
        setCurrentUser(safeUser);
        localStorage.setItem('krc_user', JSON.stringify(safeUser));
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
        setIsLoading(false);
        return true;
      } else {
        toast({
          title: "Error",
          description: "Invalid email or password",
          variant: "destructive",
        });
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during login",
        variant: "destructive",
      });
      console.error("Login error:", error);
      setIsLoading(false);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('krc_user');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  // Add new user function (only super-admin can add users)
  const addUser = async (email: string, password: string, name: string, role: UserRole): Promise<boolean> => {
    if (!currentUser || currentUser.role !== 'super-admin') {
      toast({
        title: "Error",
        description: "You don't have permission to add users",
        variant: "destructive",
      });
      return false;
    }

    try {
      const usersString = localStorage.getItem('krc_users');
      const users = usersString ? JSON.parse(usersString) : [];
      
      // Check if user already exists
      if (users.some((user: any) => user.email === email)) {
        toast({
          title: "Error",
          description: "User with this email already exists",
          variant: "destructive",
        });
        return false;
      }

      // Add new user
      const newUser = {
        id: Date.now().toString(),
        email,
        password, // In a real app, this should be hashed
        name,
        role,
      };
      
      users.push(newUser);
      localStorage.setItem('krc_users', JSON.stringify(users));
      
      toast({
        title: "Success",
        description: "User added successfully",
      });
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add user",
        variant: "destructive",
      });
      console.error("Add user error:", error);
      return false;
    }
  };

  const value = {
    currentUser,
    login,
    logout,
    isAuthenticated: !!currentUser,
    isLoading,
    addUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
