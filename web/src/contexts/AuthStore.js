import { createContext, useState, useCallback } from 'react';

import { currentUserStorageKey } from '../services/base-api-service';

const AuthContext = createContext();

function AuthStore({ children }) {

  const [currentUser, setUser] = useState(localStorage.getItem(currentUserStorageKey) ? JSON.parse(localStorage.getItem(currentUserStorageKey)) : undefined);

  const handleUserChange = useCallback((currentUser) => {
    if (currentUser) localStorage.setItem(currentUserStorageKey, JSON.stringify(currentUser));
    else localStorage.removeItem(currentUserStorageKey);
    setUser(currentUser);
  }, []);

  const isAuthenticated = useCallback(() => {
    return currentUser && currentUser.email;
  }, [currentUser])

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, onUserChange: handleUserChange }} >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthStore as default, AuthContext };