import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { Button, Text, View } from "react-native";
import { globalStyles } from "../../common/styles/global";

interface SobreProps{
  name?: string;
  email?: string;
}

const NavigationOptions = () => {
  const route = useRoute();
  const params = route.params as SobreProps;
  const navigation = useNavigation<NavigationProp<any>>();
  const name = params?.name;
  const email = params?.email;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name ?? 'TESTE'
    })
  }, [navigation])

  return(
      <View style={globalStyles.container}>
        <Text>Tela SOBRE</Text>
        <Text>Nome: {name}</Text>
        <Text>E-mail: {email}</Text>

        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </View>
    )
}

export default NavigationOptions;