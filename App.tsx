import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet } from "react-native";
import Home from "./src/pages/Home";
import Sobre, { Contato } from "./src/pages/Sobre";
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

  const Stack = createStackNavigator();

  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{
          title: 'Tela inicial',
          headerStyle: {
            backgroundColor: '#121212'
          },
          headerTintColor: '#FFF',
          headerShown: false
        }} />
        <Stack.Screen name="Sobre" component={Sobre} />
        <Stack.Screen name="Contato" component={Contato} />
      </Stack.Navigator>
    {/*
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
            { <StorageAsFunction /> }
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
      */}
    </NavigationContainer>
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