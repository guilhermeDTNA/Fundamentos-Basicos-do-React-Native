import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Button, KeyboardAvoidingView, Platform, Text, TextInput, View } from "react-native";
import { UserProps } from "../../common/types/user";
import { AuthContext } from "../../contexts/auth.tsx";

export default function Login() {
  const { user, changeName } = useContext(AuthContext) as UserProps;
  const [name, setName] = useState<string>('');
  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    if(user.name !== ''){
      navigation.navigate('Home');
    }
  })

  function handleLogin(){
    console.log(name)
    changeName(name)
    navigation.navigate('Home');
  }

  return (
    <>
      <Text>Login Page</Text>
      <KeyboardAvoidingView behavior={
        Platform.OS === 'ios' ? 'padding' : undefined
      }>
        <View>
          <TextInput placeholder="Username" onChangeText={(e) => setName(e)} />
          <TextInput secureTextEntry placeholder="Password" />
          
          <View>
            <Button title="Entrar" onPress={handleLogin} />
            <Button title="Se cadastrar" onPress={() => console.log("Register pressed")} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}