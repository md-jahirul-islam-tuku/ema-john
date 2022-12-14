import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import app from '../Firebase/firebase.config';

const AuthContext = createContext();
const auth = getAuth(app)

const UserContext = ({ children }) => {
   const [user, setUser] = useState({});
   const [loading, setLoading] = useState(true);
   
   const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
   }
   const logIn = (email, password) => {
      setLoading(true)
      return signInWithEmailAndPassword(auth, email, password);
   }
   const logOut = () => {
      setLoading(true);
      return signOut(auth);
   }
   const authInfo = { user, createUser, logIn, logOut, loading };
   useEffect(()=>{
      const unSubscribe = onAuthStateChanged(auth, currentUser => {
         setUser(currentUser);
         setLoading(false)
      });
      return ()=> unSubscribe();
   },[])

   return (
      <AuthContext.Provider value={authInfo}>
         {children}
      </AuthContext.Provider>
   );
};

export { UserContext, AuthContext };