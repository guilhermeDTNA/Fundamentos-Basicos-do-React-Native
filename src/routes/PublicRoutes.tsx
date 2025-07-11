import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/Login";

const Stack = createStackNavigator();

export default function PublicRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}