import Icon from '@react-native-vector-icons/fontawesome';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Camera from '../pages/Camera';
import BasicElements from '../pages/Home';
import Intermediario from "../pages/Intermediario";
import Maps from '../pages/Maps';
import Notificacoes from '../pages/Notificacoes';

export default function TabRoutes() {
  const Tab = createBottomTabNavigator();
  const screenOptions = {
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarShowLabel: false,
    tabBarActiveTintColor: '#FFF'
  }

  return(
    <Tab.Navigator
      screenOptions={{
        ...screenOptions,
        tabBarStyle: {
          backgroundColor: '#202225',
          borderTopWidth: 0,
        }
      }}
    >
      <Tab.Screen name="Básico" component={BasicElements}
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
      <Tab.Screen name="Mapas" component={Maps}
        options={{
          tabBarIcon: ({color, size}) => <Icon name='map' color={color} size={size} />
        }}
      />
    </Tab.Navigator>
  )
}