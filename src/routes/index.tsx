import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import { StackRoutesList } from './stackRoutes';
import TabRoutes from './tabRoutes';

export default function Routes(){
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={TabRoutes} options={{ headerShown: false }} />
      {StackRoutesList}
    </Stack.Navigator>
  );
}