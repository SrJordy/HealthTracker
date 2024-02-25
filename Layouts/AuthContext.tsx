import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [pacie, setPaci]=useState(null);
  const [pacicui, setpacicui]=useState(null);

  return (
    <AuthContext.Provider value={{user, setUser, pacie, setPaci, pacicui, setpacicui}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
