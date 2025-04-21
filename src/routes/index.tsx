import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Intermediario from "../pages/Intermediario";
import NavigationOptions from "../pages/Navegacao";
import StackRoutes from "./stackRoutes";

export default function Routes(){  
  const Tab = createBottomTabNavigator();

  return(
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFF',
        tabBarStyle: {
          backgroundColor: '#202225',
          borderTopWidth: 0
        }
      }}
    >
      <Tab.Screen name="Básico" component={StackRoutes}
        options={{
          tabBarLabel: "Elementos básicos",
          tabBarIcon: ({color, size}) => <Ionicons name="home" size={size} color={color} />
        }}
      />
      <Tab.Screen name="Intermediário" component={Intermediario}
        options={{
          tabBarIcon: ({color, size}) => <Ionicons name="phone-landscape" size={size} color={color} />,
        }}
      />

      <Tab.Screen name="Sobre" component={NavigationOptions}
        options={{
          tabBarIcon: ({color, size}) => <Ionicons name="phone-landscape" size={size} color={color} />
        }}
      />
    </Tab.Navigator>
  )
}