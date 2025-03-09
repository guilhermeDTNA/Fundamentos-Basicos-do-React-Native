import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Button, FlatList, Image, ImageStyle, ScrollView, StatusBar, StyleProp, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";

interface PersonProps{
  name: string;
  age: number;
  email: string;
  image: string;
}

export default function App(){
  const [text, setText] = useState<string>('');
  const phrases = [
    'Frase 1',
    'Frase 2',
    'Frase 3',
    'Frase 4',
  ]

  const [selectedLanguage, setSelectedLanguage] = useState<string>('java');

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

  const [randomPhrase, setRandomPhrase] = useState<string>(phrases[0]);
  const [slideValue, setSlideValue] = useState<number>(0);
  const [hideSlide, setHideSlide] = useState<boolean>(false);

  return(
    <>
      <StatusBar barStyle="light-content" backgroundColor="#3e91e4" />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Elementos básicos do React Native</Text>
            <Text style={{ color: '#FF0000', margin: 15 }}>{text !== '' ? text : 'Hello World'}</Text>

            <LogoImg {... styles.logo} />
              
            <TextInput onChangeText={setText} placeholder="Digite um texto" style={styles.input} />

            <Button onPress={() => setText('')} title="Resetar" />
          </View>

          <View style={styles.section}>
            <Text>{randomPhrase}</Text>
            <Button onPress={() => setRandomPhrase(phrases[Math.floor(Math.random() * phrases.length)])} title="Gerar Frase" />

            <View style={styles.section}>
              <View style={[styles.box, {backgroundColor: 'red'}]}></View>
              <View style={[styles.box, {backgroundColor: 'yellow'}]}></View>
              <View style={[styles.box, {backgroundColor: 'brown'}]}></View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Flatlist: lazyload na renderização ds itens da lista</Text>

            <FlatList data={people} keyExtractor={(_, index) => index.toString()} renderItem={(person) => <Person {...person.item as Readonly<PersonProps>} />} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Picker
            </Text>

            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue) =>
                setSelectedLanguage(itemValue)
              }>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
              <Picker.Item label="PHP" value="php" />
              <Picker.Item label="Python" value="python" />
              <Picker.Item label="C#" value="c#" />
            </Picker>
          </View>

          <View style={[styles.section, hideSlide && {display: 'none'}]}>
            <Text style={styles.sectionTitle}>
              Slider
            </Text>

            <Slider
              minimumValue={0}
              maximumValue={100}
              onValueChange={(value) => setSlideValue(value)}
              step={5}
              minimumTrackTintColor="#FF0000"
            />

            <Text style={{textAlign: 'center'}}>{slideValue.toFixed(0)}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Switch
            </Text>

            <Switch value={hideSlide} onValueChange={(value) => setHideSlide(value)} thumbColor='#010FFF' />
          </View>
        </ScrollView>
      </View>
    </>
  )
}

const LogoImg = (styles: StyleProp<ImageStyle>) => {
  return (
    <TouchableOpacity onPress={() => alert('Clicou na imagem')}>
      <Image
        source={require('./assets/icon.png')}
        style={styles}
      />
    </TouchableOpacity>
  )
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc', 
    flex: 1,
    paddingTop: (StatusBar.currentHeight ?? 10) + 5
  },
  logo: {
    width: 150,
    height: 150,
    margin: 15,
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
  box: {
    height: 200,
    width: '100%',
  }
})