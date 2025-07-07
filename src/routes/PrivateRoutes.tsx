import { createStackNavigator } from "@react-navigation/stack";
import { Filmes } from "../pages/Filmes";
import BasicElements from "../pages/Home";
import { Listas } from "../pages/Listas";
import NavigationOptions from "../pages/Navegacao";
import TabRoutes from "./tabRoutes";

export default function PrivateRoutes(){
  const Stack = createStackNavigator();

  const stackRoutes = [
    <Stack.Screen key={"Home"} name="Home" component={BasicElements} options={{
      title: 'Tela inicial',
      headerStyle: {
        backgroundColor: '#121212'
      },
      headerTintColor: '#FFF',
      headerShown: false
    }} />,
  
    <Stack.Screen key={"Listas"} name="Listas" component={Listas} />,
  
    <Stack.Screen key={"APIs"} name="APIs" component={Filmes} />,
    
    <Stack.Screen key={"Sobre"} name="Sobre" component={NavigationOptions} />
  ];

  return(
    <Stack.Navigator
    initialRouteName='Tabs'>
      <Stack.Screen name="Tabs" component={TabRoutes} options={{ headerShown: false }} />
      {stackRoutes}
    </Stack.Navigator>
  )
}
