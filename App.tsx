import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import Animations from "./src/components/Animations";
import BasicElements from "./src/components/BasicElements";
import ModalComponent from "./src/components/ModalComponent";
import { Movie } from "./src/components/Movies";
import StorageAsClass from "./src/components/StorageComponent/StorageAsClass";
import api from "./src/services/api";

export interface MovieProps{
  foto: string,
  id: number,
  nome: string,
  sinopse: string
}

export default function App(){  
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function loadMovies(){
    const response = await api.get('r-api/?api=filmes');
    setMovies(response.data);
    setLoading(false);
  }

  useEffect(() => {
    loadMovies();
  }, [])

  function closeModal(){
    setOpenModal(false);
  }

  return(
    <>
      <StatusBar barStyle="light-content" backgroundColor="#3e91e4" />
      <View style={globalStyles.container}>
        <ScrollView showsVerticalScrollIndicator>
          <View style={globalStyles.section}>
            <Text style={globalStyles.sectionTitle}>Animações</Text>

            <Animations />
          </View>

          <BasicElements />

          <View style={globalStyles.section}>
            <Text style={globalStyles.sectionTitle}>Async Storage</Text>

            <Text style={globalStyles.sectionTitle}>Importando classe</Text>
            <StorageAsClass />
            {/* <StorageAsFunction /> */}
          </View>
        </ScrollView>

        <View>
          <Button title="Abrir modal" onPress={() => setOpenModal(true)} />
          <ModalComponent openModal={openModal} closeModal={closeModal} />
        </View>
      </View>

      {loading ? 
        (<View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <ActivityIndicator color="#121212" size={45} />
        </View>) : 
        (<View>
          <FlatList
            data={movies}
            renderItem={({item}) => <Movie movie={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>)
      }
      
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