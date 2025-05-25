import { useEffect, useState } from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MovieProps } from "../../types/Filmes";
import { Details } from "./Details";

export interface MovieCard{
  movie: MovieProps
}

export const Movie = ({ movie }: MovieCard) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [imageHeight, setImageHeight] = useState<number>(250);

  useEffect(() => {
    Image.getSize(
      movie.foto,
      (width, height) => {
        const ratio = height / width;
        setImageHeight(250 * ratio); // 250 é o width fixo
      },
      (error) => {
        console.error('Erro ao obter a imagem:', error);
        setImageHeight(250); // fallback
      }
    );
  }, [movie.foto]);

  return(
    <View>
      <View style={styles.card}>
        <Text style={styles.title}>{movie.nome}</Text>

        <Image
          source={{uri: movie.foto}}
          style={[styles.capa, { height: imageHeight }]}
        />

        <View style={styles.areaBtn}>
          <TouchableOpacity style={styles.btn} onPress={() => setOpenModal(true)}>
            <Text style={styles.btnText}>Leia Mais</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <Modal animationType="slide" visible={openModal} transparent={true}>
        <Details movie={movie} back={() => setOpenModal(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    margin: 15,
    elevation: 2
  },
  capa:{
    width: 250,
    zIndex: 2
  },
  title:{
    padding: 15,
    fontSize: 18,
  },
  areaBtn: {
    alignItems: 'flex-end',
    marginTop: -40,
    zIndex: 9
  },
  btn: {
    width: 100,
    backgroundColor: '#09A6FF',
    opacity: 1,
    padding: 8,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  btnText: {
    color: '#FFF',
    textAlign: 'center'
  }
})