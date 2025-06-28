import { GoogleSignin, isSuccessResponse } from '@react-native-google-signin/google-signin';
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useState } from "react";
import { Button, KeyboardAvoidingView, Platform, Text, TextInput, View } from "react-native";
import { UserProps } from "../../common/types/user";
import { AuthContext } from "../../contexts/auth.tsx";

GoogleSignin.configure({
  // Replace with your web client ID (para IOS)
})

export default function Login() {
  const { updateUser, authenticate, isAuthenticated } = useContext(AuthContext) as UserProps;
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation<NavigationProp<any>>();

  useFocusEffect(
    useCallback(() => {
      if (isAuthenticated) {
        navigation.navigate('Home');
      }
    }, [isAuthenticated, navigation])
  );

  function handleLogin(){
    if(name !== '' && password !== ''){
      updateUser({
        name: name,
      })
      authenticate(true);
      navigation.navigate('Home');
    }
  }

  async function handleGoogleLogin() {
    try{
      await GoogleSignin.signIn();
      const response = await GoogleSignin.signIn();

      if(isSuccessResponse(response)){
        const {name: nameUser, photo, email, familyName } = response.data.user;
        updateUser({
          name: nameUser ?? '',
          photo: photo ?? '',
          email: email,
          lastName: familyName ?? ''
        })
        authenticate(true);
        navigation.navigate('Home');
      }
    } catch(error){
      console.error("Google Sign-In error", error);
      throw new Error("An error occurred during Google Sign-In");
    }
  }

  return (
    <>
      <Text>Login Page</Text>
      <KeyboardAvoidingView behavior={
        Platform.OS === 'ios' ? 'padding' : undefined
      }>
        <View>
          <TextInput placeholder="Username" onChangeText={(e) => setName(e)} />
          <TextInput secureTextEntry placeholder="Password" onChangeText={(e) => setPassword(e)} />
          
          <View>
            <Button title="Entrar" onPress={handleLogin} />
            <Button title="Se cadastrar" onPress={() => console.log("Register pressed")} />
          </View>

          <View>
            <Button title="Login com Google" onPress={handleGoogleLogin} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}