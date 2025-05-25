import Icon from '@react-native-vector-icons/fontawesome';
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
          tabBarIcon: ({color, size}) => <Icon name='home' color={color} size={size} />
        }}
      />
      <Tab.Screen name="Intermediário" component={Intermediario}
        options={{
          tabBarIcon: ({color, size}) => <Icon name='level-up' color={color} size={size} />,
        }}
      />

      <Tab.Screen name="Sobre" component={NavigationOptions}
        options={{
          tabBarIcon: ({color, size}) => <Icon name='info-circle' color={color} size={size}/>
        }}
      />
    </Tab.Navigator>
  )
}