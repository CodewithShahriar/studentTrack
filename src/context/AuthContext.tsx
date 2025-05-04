
import React, { createContext, useState, useContext, ReactNode } from "react";
import { User, users } from "@/data/mockData";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  currentUser: User | null;
  login: (userId: string, password: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { toast } = useToast();
  
  const login = (userId: string, password: string): boolean => {
    const user = users.find(u => u.id === userId && u.password === password);
    
    if (user) {
      setCurrentUser(user);
      toast({
        title: "Login successful",
        description: `Welcome, ${user.name}!`,
      });
      return true;
    } else {
      toast({
        title: "Login failed",
        description: "Invalid ID or password",
        variant: "destructive",
      });
      return false;
    }
  };
  
  const logout = () => {
    setCurrentUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };
  
  const isAdmin = currentUser?.role === "admin";
  
  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
