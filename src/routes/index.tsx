import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { Contato } from "../pages/Sobre";
import api from "../services/api";
import StackRoutes from "./stackRoutes";

export interface MovieProps{
  foto: string,
  id: number,
  nome: string,
  sinopse: string
}

export default function Routes(){  
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
  const Tab = createBottomTabNavigator();

  return(
      <>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#FFF',
            tabBarStyle: {
              backgroundColor: '#202225',
              borderTopWidth: 0
            }
          }}
        >
          <Tab.Screen name="Home" component={StackRoutes}
            options={{
              tabBarLabel: "Início",
              tabBarIcon: ({color, size}) => <Ionicons name="home" size={size} color={color} />
            }}
          />
          <Tab.Screen name="Contato" component={Contato}
            options={{
              tabBarIcon: ({color, size}) => <Ionicons name="phone-landscape" size={size} color={color} />
            }}
          />
        </Tab.Navigator>

      {/*
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
          */}


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