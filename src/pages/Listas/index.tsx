import { NavigationProp, StackActions, useNavigation } from "@react-navigation/native";
import { Button, FlatList, Image, Text, View } from "react-native";
import { globalStyles } from "../../common/styles/global";

interface PersonProps{
  name: string;
  age: number;
  email: string;
  image: string;
}

function Person(person: Readonly<PersonProps>){
    return (
      <View style={{marginTop: 20}}>
        <Text>{person.name}</Text>
        <Text>{person.age}</Text>
        <Text>{person.email}</Text>
        <Image source={{uri: person.image}} style={{width: 100, height: 100}} />
      </View>
    )
  }

export const Listas = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const people: PersonProps[] = [
      {
        name: 'João',
        age: 20,
        email: 'joao@teste.com',
        image: 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png'
      },
      {
        name: 'Maria',
        age: 22,
        email: 'maria@teste.com',
        image: 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png'
      },
      {
        name: 'José',
        age: 27,
        email: 'jose@teste.com',
        image: 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png'
      },
      {
        name: 'Truco',
        age: 34,
        email: 'truco@teste.com',
        image: 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png'
      },
    ]

  return(
    <View style={globalStyles.section}>
      <Text style={globalStyles.sectionTitle}>Flatlist: lazyload na renderização ds itens da lista</Text>
      <Button title="Limpar pilha e ir para a home" onPress={() => navigation.dispatch(StackActions.popToTop())} />
      <FlatList data={people} keyExtractor={(_, index) => index.toString()} renderItem={(person) => <Person {...person.item as Readonly<PersonProps>} />} />

      
    </View>
  )
}