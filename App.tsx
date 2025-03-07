import React, { useState } from "react";
import { Button, Image, ImageStyle, StyleProp, StyleSheet, Text, TextInput, View } from "react-native";

export default function App(){
  const [text, setText] = useState<string>('');

  return(
    <View style={styles.container}>
      <Text style={{ color: '#FF0000', margin: 15 }}>{text !== '' ? text : 'Hello World'}</Text>

      <LogoImg {... styles.logo} />
      
      <TextInput onChangeText={setText} placeholder="Digite um texto" style={styles.input} />

      <Button onPress={() => setText('')} title="Resetar" />
    </View>
  )
}

const LogoImg = (styles: StyleProp<ImageStyle>) => {
  return (
    <Image
      source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
      style={styles}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc', 
    flex: 1,
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
  }
})