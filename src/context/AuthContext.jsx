import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const storedRoles = JSON.parse(localStorage.getItem("roles") || "[]");
  const storedToken = localStorage.getItem("token") || "";
  const storedUserName = localStorage.getItem("userName") || "Usuário";

  const [token, setToken] = useState(storedToken);
  const [roles, setRoles] = useState(storedRoles);
  const [userName, setUserName] = useState(storedUserName);
  const [user, setUser] = useState(storedUser);

  const login = (tokenValue, rolesValue, userData) => {
    const userWithFallback = {
      ...userData,
      profileImage:
        userData.profileImage ||
        "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Riley",
    };

    setToken(tokenValue);
    setRoles(rolesValue);
    setUser(userWithFallback);
    setUserName(userWithFallback.fullName || "Usuário");

    localStorage.setItem("token", tokenValue);
    localStorage.setItem("roles", JSON.stringify(rolesValue));
    localStorage.setItem("user", JSON.stringify(userWithFallback));
    localStorage.setItem("userName", userWithFallback.fullName || "Usuário");
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

  const updateProfileImage = (newImage) => {
    setUser((prev) => {
      const updatedUser = { ...prev, profileImage: newImage };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
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
      value={{ token, roles, userName, user, login, updateUserName, updateProfileImage, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}