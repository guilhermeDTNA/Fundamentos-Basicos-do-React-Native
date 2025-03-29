import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";

const Home = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  function goToAbout(){
    navigation.navigate('Sobre', {
      name: 'Guilherme Rocha',
      email: 'teste@teste.com'
    });
  }

  return(
    <View style={styles.container}>
      <Text>Tela HOME</Text>

      <Button title="Sobre nós" onPress={goToAbout} />
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

export default Home;