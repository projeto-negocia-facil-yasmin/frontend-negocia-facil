import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [roles, setRoles] = useState(JSON.parse(localStorage.getItem("roles") || "[]"));
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "Usuário");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "null"));

  const login = (tokenValue, rolesValue, userData) => {
    setToken(tokenValue);
    setRoles(rolesValue);
    setUserName(userData.fullName);
    setUser(userData);

    localStorage.setItem("token", tokenValue);
    localStorage.setItem("roles", JSON.stringify(rolesValue));
    localStorage.setItem("userName", userData.fullName);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const updateUserName = (newName) => {
    setUserName(newName);
    setUser((prev) => {
      const updatedUser = { ...prev, fullName: newName };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
    localStorage.setItem("userName", newName);
  };

  const logout = () => {
    setToken("");
    setRoles([]);
    setUserName("Usuário");
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{ token, roles, userName, user, login, updateUserName, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}