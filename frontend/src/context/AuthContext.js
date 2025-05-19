import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [token, setToken] = useState(localStorage.getItem('token'));

  // useEffect (() => {
  //   const storedUser = localStorage.getItem('user');
  //   const storedToken = localStorage.getItem('token');
  //   if (storedUser && storedToken){
  //     setUser(JSON.parse(storedUser));
  //     setToken(storedToken);
  //   }else{
  //     setUser(null);
  //     setToken(null);
  //   }
  // }, []);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    // localStorage.clear();
    
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
