import React, { useEffect, createContext, useState } from 'react';
import { onIdTokenChanged } from 'firebase/auth';
import { auth, googleLogOut } from '../service/firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async user => {
      if (user) {
        const token = await user.getIdToken();
        const strToken = JSON.stringify(token);
        localStorage.setItem('token', strToken);
      }
    });
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    const isLogin = JSON.parse(localStorage.getItem('isLogin'));
    if (isLogin) {
      setUser(isLogin);
    } else {
      setUser(false);
    }
  }, []);

  const loginHandler = () => {
    localStorage.setItem('isLogin', 'true');
  };

  const logoutHandler = async () => {
    await googleLogOut();
    localStorage.removeItem('isLogin');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={(loginHandler, logoutHandler, user)}>
      {children}
    </AuthContext.Provider>
  );
};
