import { createStackNavigator } from "@react-navigation/stack";
import { Filmes } from "../pages/Filmes";
import BasicElements from "../pages/Home";
import { Listas } from "../pages/Listas";

const Stack = createStackNavigator();

export default function StackRoutes(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={BasicElements} options={{
        title: 'Tela inicial',
        headerStyle: {
          backgroundColor: '#121212'
        },
        headerTintColor: '#FFF',
        headerShown: false
      }} />
      <Stack.Screen name="Listas" component={Listas} />
      <Stack.Screen name="APIs" component={Filmes} />
    </Stack.Navigator>
  )
}