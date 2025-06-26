import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from "react";
import { IsAuthenticated } from '../common/utils/authentication';
import { StackRoutesList } from './stackRoutes';
import TabRoutes from './tabRoutes';

export default function Routes(){
  const Stack = createStackNavigator();
  const isAuthenticated = IsAuthenticated();
  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    if(!isAuthenticated) navigation.navigate('SignIn');
  }, [isAuthenticated])

  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={TabRoutes} options={{ headerShown: false }} />
      {StackRoutesList}
    </Stack.Navigator>
  );
}