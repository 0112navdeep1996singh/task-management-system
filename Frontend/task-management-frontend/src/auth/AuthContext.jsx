import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TOKEN_KEY } from "../utils/constants"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");
    const id = localStorage.getItem("userId"); 
    return token && role && username && id
      ? { token, role, username, id: Number(id) }
      : null;
  });

  const login = ({ token, role, username, id }) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem("role", role);
    localStorage.setItem("username", username);
    localStorage.setItem("userId", id); 
    setUser({ token, role, username, id: Number(id) });

    if (role === "ADMIN") navigate("/admin", { replace: true });
    else navigate("/dashboard", { replace: true });
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("userId"); 
    setUser(null);
    navigate("/login", { replace: true });
  };

  const isAdmin = user?.role === "ADMIN";

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);