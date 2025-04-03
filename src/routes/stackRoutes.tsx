import { createStackNavigator } from "@react-navigation/stack";
import Home from "../pages/Home";
import Sobre from "../pages/Sobre";

const Stack = createStackNavigator();

export default function StackRoutes(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Sobre" component={Sobre} />
    </Stack.Navigator>
  )
}