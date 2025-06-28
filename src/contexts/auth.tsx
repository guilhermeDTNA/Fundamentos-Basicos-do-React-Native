import { createContext, ReactNode, useMemo, useState } from "react";
import { UserData } from "../common/types/user";

export const AuthContext = createContext({});

export default function AuthProvider({children}: {children: ReactNode}){
  const [user, setUser] = useState({
    name: '',
    email: '',
    photo: '',
    lastName: ''
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function updateUser(userData: UserData){
    const {name, email, photo, lastName} = userData
    console.log(userData)
    setUser((prevUser) => ({
      name: name ?? prevUser.name, 
      email: email ?? prevUser.email, 
      photo: photo ?? prevUser.photo, 
      lastName: lastName ?? prevUser.lastName
    }));
    console.log(user)
  }

  function authenticate(value: boolean) {
      setIsAuthenticated(value);
  }

  const contextValue = useMemo(() => ({
    user,
    updateUser,
    isAuthenticated,
    authenticate
  }), [user]);

  return(
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}