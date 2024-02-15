import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userID, setUserID] = useState(null);
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);

  return (
    <AuthContext.Provider value={{ userID, setUserID, user, setUser, roles, setRoles }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
