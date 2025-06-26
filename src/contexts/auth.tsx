import { createContext, ReactNode, useMemo, useState } from "react";

export const AuthContext = createContext({});

export default function AuthProvider({children}: {children: ReactNode}){
  const [user, setUser] = useState({
    name: ''
  });

  function changeName(name: string) {
    setUser((prevUser) => ({
      ...prevUser,
      name: name
    }));
  }

  const contextValue = useMemo(() => ({
    user,
    changeName
  }), [user]);

  return(
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}