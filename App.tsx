import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import AuthProvider from "./src/contexts/auth.tsx";
import Routes from "./src/routes";

export default function App(){
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  )
}