import React, { useState } from "react";
import { Button, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import BasicElements from "./src/components/BasicElements";
import ModalComponent from "./src/components/ModalComponent";
import StorageAsClass from "./src/components/StorageComponent/StorageAsClass";

export default function App(){  
  const [openModal, setOpenModal] = useState<boolean>(false);

  function closeModal(){
    setOpenModal(false);
  }

  return(
    <>
      <StatusBar barStyle="light-content" backgroundColor="#3e91e4" />
      <View style={globalStyles.container}>
        <ScrollView showsVerticalScrollIndicator>
          <BasicElements />

          <View style={globalStyles.section}>
            <Text style={globalStyles.sectionTitle}>Async Storage</Text>

            <Text style={globalStyles.sectionTitle}>Importando classe</Text>
            <StorageAsClass />
            {/* <StorageAsFunction /> */}
          </View>
        </ScrollView>
      </View>

      <View>
        <Button title="Abrir modal" onPress={() => setOpenModal(true)} />
        <ModalComponent openModal={openModal} closeModal={closeModal} />
      </View>
    </>
  )
}

export const globalStyles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc', 
    flex: 1,
    paddingTop: (StatusBar.currentHeight ?? 10) + 5
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#ccc',
    marginHorizontal: 10
  },
  section: {
    marginTop: 20, 
    marginBlock: 15
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    color: 'brown'
  },
})