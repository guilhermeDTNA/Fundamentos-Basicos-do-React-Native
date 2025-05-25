import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, Button, Image, ImageStyle, ScrollView, StyleProp, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../common/styles/global";



const BasicElements = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('java');
  const navigation = useNavigation<NavigationProp<any>>();

  

  const [text, setText] = useState<string>('');
  const phrases = [
    'Frase 1',
    'Frase 2',
    'Frase 3',
    'Frase 4',
  ];
  const [randomPhrase, setRandomPhrase] = useState<string>(phrases[0]);
  const [slideValue, setSlideValue] = useState<number>(0);
  const [hideSlide, setHideSlide] = useState<boolean>(false);

  function goToMovies(){
    navigation.navigate('APIs', {
      name: 'Guilherme Rocha',
      email: 'teste@teste.com'
    });
  }

  const LogoImg = (styles: StyleProp<ImageStyle>) => {
    return (
      <TouchableOpacity onPress={() => Alert.alert('Clicou na imagem')}>
        <Image
          source={require('../../../assets/icon.png')}
          style={styles}
        />
      </TouchableOpacity>
    )
  }

  return(
    <ScrollView>
      <View style={globalStyles.section}>
        <Text style={globalStyles.sectionTitle}>Elementos básicos do React Native</Text>
        <Text style={{ color: '#FF0000', margin: 15 }}>{text !== '' ? text : 'Hello World'}</Text>

        <LogoImg {... styles.logo} />
          
        <TextInput onChangeText={setText} placeholder="Digite um texto" style={styles.input} />

        <Button onPress={() => setText('')} title="Resetar" />
      </View>

      <View style={globalStyles.section}>
        <Text>{randomPhrase}</Text>
        <Button onPress={() => setRandomPhrase(phrases[Math.floor(Math.random() * phrases.length)])} title="Gerar Frase" />

        <View style={globalStyles.section}>
          <View style={[styles.box, {backgroundColor: 'red'}]}></View>
          <View style={[styles.box, {backgroundColor: 'yellow'}]}></View>
          <View style={[styles.box, {backgroundColor: 'brown'}]}></View>
        </View>
      </View>

      <View style={globalStyles.section}>
        <Text style={globalStyles.sectionTitle}>
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

      <View style={[globalStyles.section, hideSlide && {display: 'none'}]}>
        <Text style={globalStyles.sectionTitle}>
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

      <View style={globalStyles.section}>
        <Text style={globalStyles.sectionTitle}>
          Switch
        </Text>

        <Switch value={hideSlide} onValueChange={(value) => setHideSlide(value)} thumbColor='#010FFF' />
      </View>

      <View>
        <Text style={globalStyles.sectionTitle}>
          Manipulação de Listas
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Listas')} style={styles.btnAdd}>
          <Text style={{color: '#FFF', textAlign: "center", fontWeight: 'bold'}}>Saber mais</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={globalStyles.sectionTitle}>
          Manipulação de APIs
        </Text>

        <TouchableOpacity onPress={goToMovies} style={styles.btnAdd}>
          <Text style={{color: '#FFF', textAlign: "center", fontWeight: 'bold'}}>Saber mais</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default BasicElements;

const styles = StyleSheet.create({
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
  box: {
    height: 200,
    width: '100%',
  },
  btnAdd: {
    backgroundColor: '#000',
    color: '#FFF',
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
    padding: 5,
    marginHorizontal: 10,
    marginTop: 10,
  }
})