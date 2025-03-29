import { NavigationProp, StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

interface SobreProps{
  name?: string;
  email?: string;
}

const Sobre = () => {
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
      <View style={styles.container}>
        <Text>Tela SOBRE</Text>
        <Text>Nome: {name}</Text>
        <Text>E-mail: {email}</Text>

        <Button title="Voltar" onPress={() => navigation.goBack()} />

        <Button title="Ver mais" onPress={() => navigation.navigate('Contato')} />
      </View>
    )
}

export const Contato = () => {
  const navigation = useNavigation();

  function handleHome(){
    navigation.dispatch(StackActions.popToTop());
  }

  return(
    <View style={styles.container}>
      <Text>Contato</Text>
      <Button title="Voltar" onPress={handleHome} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Sobre;