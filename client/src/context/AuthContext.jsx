import { createContext, useContext, useMemo, useState } from "react";
import API from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); }
    catch { return null; }
  });
  const [loading, setLoading] = useState(false);

  const register = async (form) => {
    setLoading(true);
    try {
      const response = await API.post("/auth/register", form);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  const login = async (form) => {
    setLoading(true);
    try {
      const response = await API.post("/auth/login", form);
      localStorage.setItem("token", response.data.token);
      // Older backend versions may include password in the response; never store it.
      const safeUser = {
        id: response.data.user.id || response.data.user._id,
        name: response.data.user.name,
        email: response.data.user.email,
        role: response.data.user.role,
      };
      localStorage.setItem("user", JSON.stringify(safeUser));
      setUser(safeUser);
      return safeUser;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = useMemo(() => ({ user, loading, register, login, logout }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}