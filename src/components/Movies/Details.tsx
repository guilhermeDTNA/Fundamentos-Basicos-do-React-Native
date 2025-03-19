import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MovieCard } from ".";

interface MoviePops extends MovieCard{
  back: () => void
}

export function Details({movie, back}: Readonly<MoviePops>){
  return(
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.btnBack} onPress={back}>
          <Text style={{color: '#FFF', fontSize: 16}}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{movie.nome}</Text>
        <Text style={styles.sinopse}>Sinopse:</Text>
        <Text style={styles.description}>{movie.sinopse}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  modalContainer: {
    height: '80%',
    backgroundColor: '#121212',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  btnBack: {
    backgroundColor: '#E52246',
    padding: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  title: {
    textAlign: 'center',
    color: '#FFF',
    padding: 10,
    fontSize: 28,
    fontWeight: 'bold'
  },
  sinopse: {
    color: '#FFF',
    fontSize: 18,
    marginBottom: 8,
    marginLeft: 10
  },
  description: {
    color: '#FFF',
    marginHorizontal: 10
  }
})