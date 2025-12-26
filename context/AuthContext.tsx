import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Mock user database
const mockUsers = [
  { id: '1', email: 'test@example.com', password: 'password123', name: 'Test User' }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await SecureStore.getItemAsync('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Failed to load user', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password
    );
    
    if (!foundUser) {
      throw new Error('Invalid credentials');
    }

    const userData = { id: foundUser.id, email: foundUser.email, name: foundUser.name };
    await SecureStore.setItemAsync('user', JSON.stringify(userData));
    setUser(userData);
  };

  const signUp = async (email: string, password: string, name: string) => {
    const newUser = {
      id: String(mockUsers.length + 1),
      email,
      password,
      name
    };
    
    mockUsers.push(newUser);
    const userData = { id: newUser.id, email: newUser.email, name: newUser.name };
    await SecureStore.setItemAsync('user', JSON.stringify(userData));
    setUser(userData);
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
