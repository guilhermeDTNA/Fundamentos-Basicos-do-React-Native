import { createStackNavigator } from "@react-navigation/stack";
import { IsAuthenticated } from "../common/utils/authentication";
import { Filmes } from "../pages/Filmes";
import BasicElements from "../pages/Home";
import { Listas } from "../pages/Listas";
import Login from "../pages/Login";
import NavigationOptions from "../pages/Navegacao";

const Stack = createStackNavigator();

export const StackRoutesList = [
  <Stack.Screen
    key="SignIn"
    name="SignIn"
    component={Login}
    options={{
      headerShown: false
    }}
  />,

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

export default function StackRoutes(){
  const isAuthenticated = IsAuthenticated();

  return (
    <Stack.Navigator
    initialRouteName={`${isAuthenticated ? 'Home' : 'SignIn'}`}>
      {StackRoutesList}
    </Stack.Navigator>
  )
}