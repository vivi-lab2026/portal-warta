import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { INITIAL_USERS } from '../data/initialData';

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  login: (email: string, role?: UserRole) => boolean;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  createUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUserStatus: (id: string, active: boolean) => void;
  isAdmin: boolean;
  isGuru: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_AUTH = 'wartahukum_auth_user';
const STORAGE_KEY_USERS = 'wartahukum_all_users';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USERS);
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_AUTH);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
    } catch (e) {
      console.warn('Could not save users to storage', e);
    }
  }, [users]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEY_AUTH);
      }
    } catch (e) {
      console.warn('Could not save current user to storage', e);
    }
  }, [currentUser]);

  const login = (email: string, requestedRole?: UserRole): boolean => {
    const trimmed = email.trim().toLowerCase();
    let found = users.find(u => u.email.toLowerCase() === trimmed);
    
    // Quick demo login fallback by role or default admin
    if (!found) {
      if (trimmed.includes('admin') || requestedRole === 'ADMIN') {
        found = users.find(u => u.role === 'ADMIN');
      } else if (trimmed.includes('guru') || requestedRole === 'GURU') {
        found = users.find(u => u.role === 'GURU');
      }
    }

    if (found && found.active) {
      setCurrentUser(found);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchRole = (role: UserRole) => {
    const target = users.find(u => u.role === role && u.active);
    if (target) {
      setCurrentUser(target);
    }
  };

  const createUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setUsers(prev => [...prev, newUser]);
  };

  const updateUserStatus = (id: string, active: boolean) => {
    setUsers(prev => prev.map(u => (u.id === id ? { ...u, active } : u)));
    if (currentUser?.id === id && !active) {
      logout();
    }
  };

  const isAdmin = currentUser?.role === 'ADMIN';
  const isGuru = currentUser?.role === 'GURU';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        login,
        logout,
        switchRole,
        createUser,
        updateUserStatus,
        isAdmin,
        isGuru
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
