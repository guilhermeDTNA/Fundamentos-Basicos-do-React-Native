import Icon from '@react-native-vector-icons/fontawesome';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import { UserProps } from '../common/types/user';
import { AuthContext } from '../contexts/auth';
import Camera from '../pages/Camera';
import Intermediario from "../pages/Intermediario";
import Notificacoes from '../pages/Notificacoes';
import StackRoutes from "./stackRoutes";

export default function TabRoutes() {
  const Tab = createBottomTabNavigator();
  const { isAuthenticated } = useContext(AuthContext) as UserProps;
  const screenOptions = {
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarShowLabel: false,
    tabBarActiveTintColor: '#FFF'
  }

  return(
    <Tab.Navigator
      screenOptions={isAuthenticated ? {
        ...screenOptions,
        tabBarStyle: {
          backgroundColor: '#202225',
          borderTopWidth: 0,
        }
      } : {
        ...screenOptions,
        tabBarStyle: {
          display: 'none',
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
      <Tab.Screen name="Notificações" component={Notificacoes}
        options={{
          tabBarIcon: ({color, size}) => <Icon name='bell' color={color} size={size} />
        }}
      />
      <Tab.Screen name="Câmera" component={Camera}
        options={{
          tabBarIcon: ({color, size}) => <Icon name='camera' color={color} size={size} />
        }}
      />
    </Tab.Navigator>
  )
}