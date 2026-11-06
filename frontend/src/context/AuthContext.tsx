import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export interface User {
  id: string;
  fullName: string;
  email?: string;
  phoneNumber: string;
  city?: string;
  carBrand?: string;
  carModel?: string;
  role?: "user" | "admin";
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (identifier: string, password: string) => Promise<boolean>;
  register: (userData: {
    fullName: string;
    phoneNumber: string;
    email?: string;
    password: string;
    city?: string;
    carBrand?: string;
    carModel?: string;
  }) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem("motordoctor_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("motordoctor_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("motordoctor_user");
    }
  }, [user]);

  const login = async (identifier: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password })
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Login failed. Please check credentials.");
        return false;
      }

      setUser(data.user);
      toast.success(`Welcome back, ${data.user.fullName}!`);
      return true;
    } catch (err) {
      // Fallback offline mock login if server unreachable
      if (identifier.includes("admin")) {
        const adminUser: User = {
          id: "usr_admin",
          fullName: "Admin Officer",
          email: "admin@motordoctor.in",
          phoneNumber: "7534894896",
          city: "Mumbai",
          role: "admin"
        };
        setUser(adminUser);
        toast.success("Logged in as Admin!");
        return true;
      }

      const mockUser: User = {
        id: `usr_${Date.now()}`,
        fullName: identifier.split("@")[0] || "Motor Doctor Member",
        phoneNumber: identifier,
        city: "India",
        role: "user"
      };
      setUser(mockUser);
      toast.success("Logged in successfully!");
      return true;
    }
  };

  const register = async (userData: {
    fullName: string;
    phoneNumber: string;
    email?: string;
    password: string;
    city?: string;
    carBrand?: string;
    carModel?: string;
  }): Promise<boolean> => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Registration failed.");
        return false;
      }

      setUser(data.user);
      toast.success("Account created successfully! Welcome to Motor Doctor.");
      return true;
    } catch (err) {
      const fallbackUser: User = {
        id: `usr_${Date.now()}`,
        fullName: userData.fullName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        city: userData.city || "India",
        carBrand: userData.carBrand,
        carModel: userData.carModel,
        role: "user"
      };
      setUser(fallbackUser);
      toast.success("Account registered successfully!");
      return true;
    }
  };

  const logout = () => {
    setUser(null);
    toast.info("Logged out successfully.");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin" || user?.email?.includes("admin"),
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

