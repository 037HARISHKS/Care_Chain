import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (formData) => {
    try {
      const response = await fetch(`/api/auth/${formData.role}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        try {
          data = await response.json();
        } catch (e) {
          throw new Error("Invalid response from server");
        }
      } else {
        throw new Error("Server response was not in JSON format");
      }

      if (!response.ok) {
        throw new Error(data?.message || "Login failed");
      }

      if (!data || !data.user || !data.token) {
        throw new Error("Invalid response data from server");
      }

      setUser(data.user);
      setIsAuthenticated(true);
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
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
