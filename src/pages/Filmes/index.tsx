import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import api from "../../services/api";
import { Movie } from "./components/Movies";
import { MovieProps } from "./types/Filmes";

export const Filmes = () => {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    loadMovies();
  }, [])

  async function loadMovies(){
    const response = await api.get('r-api/?api=filmes');
    setMovies(response.data);
    setLoading(false);
  }    

  return(
    loading ? 
    (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <ActivityIndicator color="#121212" size={45} />
      </View>
    ) : 
    (
      <View>
        <FlatList
          data={movies}
          renderItem={({item}) => <Movie movie={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    )
    
  )
}