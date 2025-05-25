import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "../../common/styles/global";
import Animations from "./components/Animations";
import ModalComponent from "./components/ModalComponent";
import StorageAsFunction from "./components/StorageComponent/StorageAsFunction";

const Intermediario = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<any>>();

  function closeModal(){
    setOpenModal(false);
  }

  function goToAbout(){
    navigation.navigate('Sobre', {
      name: 'Guilherme Rocha',
      email: 'teste@teste.com'
    });
  }

  return(
    <View style={globalStyles.container}>
      <GestureHandlerRootView style={globalStyles.container}>
        <ScrollView showsVerticalScrollIndicator>
          <View style={globalStyles.section}>
            <Text style={globalStyles.sectionTitle}>Animações</Text>

            <Animations />
          </View>


          <View style={globalStyles.section}>
            <Text style={globalStyles.sectionTitle}>Async Storage</Text>

            <Text style={globalStyles.sectionTitle}>Importando classe</Text>
            <StorageAsFunction />
          </View>
        </ScrollView>

        <View>
          <Button title="Abrir modal" onPress={() => setOpenModal(true)} />
          <ModalComponent openModal={openModal} closeModal={closeModal} />
        </View>
      </GestureHandlerRootView>

      <View>
        <Text style={globalStyles.sectionTitle}>Atributos de navegação</Text>
        <TouchableOpacity onPress={goToAbout}>
          <Text>
            Passando os seguintes parâmetros para outra tela: {'\n'}
            name: 'Guilherme Rocha',{'\n'}
            email: 'teste@teste.com'{'\n'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Intermediario;