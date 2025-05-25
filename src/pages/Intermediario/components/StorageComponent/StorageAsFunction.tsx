import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function StorageAsFunction(){
  const [name, setName] = useState<string>('');
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    async function getStorage(){
      const nameStorage = await AsyncStorage.getItem('name');
      if(nameStorage !== null){
        setName(nameStorage);
      }
    }

    getStorage();
  }, [])

  function changeName(){
    setName(input);
    AsyncStorage.setItem('name', input);
    setInput('');
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Digite seu nome"
        value={input}
        onChangeText={(text) => setInput(text)}
      />
      <TouchableOpacity style={styles.btn} onPress={changeName}>
        <Text style={styles.btnText}>Alterar nome</Text>
      </TouchableOpacity>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 15
  },
  text:{
    color: '#000',
    fontSize: 35
  },
  btn:{
    backgroundColor: '#212',
    alignItems: 'center',
  },
  btnText:{
    color: '#fff',
    fontSize: 20
  }
})