import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    // Lógica de inicio de sesión (puedes modificarla según tus necesidades)
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Lógica de cierre de sesión (puedes modificarla según tus necesidades)
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
