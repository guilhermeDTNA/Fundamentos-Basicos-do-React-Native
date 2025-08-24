import Geolocation from '@react-native-community/geolocation';
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CameraOptions, ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import MapView, { Callout, Marker } from 'react-native-maps';
import { globalStyles } from "../../common/styles/global";

export default function Camera(){
  const [photo, setPhoto] = useState<string>();

  function openAlbum(){
    const options = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 2,
    }

    launchImageLibrary(options as ImageLibraryOptions, (response) => {
      if(response.didCancel){
        console.log("CANCELADO");
        return;
      }

      if(response.errorMessage){
        console.error('Erro capturado: ' + response.errorMessage)
      }

      console.log(response.assets);
      setPhoto(response.assets?.[0]?.uri);
    })
  }

  async function openCamera(){
    const options = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true
    }

    const response = await launchCamera(options as CameraOptions);
    console.log(response.assets);
    setPhoto(response.assets?.[0]?.uri);
  }

  // Mapas
  interface Region{
    name?: string;
    latitude: number;
    longitude: number;
  }

  const regions: Region[] = [
    {
      name: "Diamantina",
      latitude: -18.2339566,
      longitude: -43.6087307
    },
    {
      name: "Curvelo",
      latitude: -18.8062759,
      longitude: -44.4130455
    },
    {
      name: "Formiga",
      latitude: -20.0664842,
      longitude: -50.0532568
    }
  ]

  const [region, setRegion] = useState<Region>(regions[0]);

  useEffect(() => {
    async function getPosition(){
      await Geolocation.getCurrentPosition(async ({
        coords: {latitude, longitude}
      }) => {
        setRegion({name: "Atual", latitude, longitude});
      }),
      () => {},
      {
        timeout: 2000,
        maximumAge: 1000
      }
    }

    getPosition();
  }, [])
  
  function changeRegion(name: string){
    const index = regions.findIndex(region => region.name === name);
    if(index !== -1) setRegion(regions[index]);
  }

  return(
    <SafeAreaView style={globalStyles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={{
          display: 'flex',
          justifyContent: 'space-around'
        }}>
          <TouchableOpacity onPress={openAlbum}>
            <Text>Abrir album</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={openCamera}>
            <Text>Abrir câmera</Text>
          </TouchableOpacity>
        </View>

        {
          photo && <Image src={photo} width={400} height={400} />
        }

        <View>
          <Picker
            selectedValue={region.name}
            onValueChange={(itemValue) =>
              changeRegion(itemValue)
            }>
            <Picker.Item label="Diamantina" value="Diamantina" />
            <Picker.Item label="Curvelo" value="Curvelo" />
            <Picker.Item label="Formiga" value="Formiga" />
          </Picker>

          <View>
            <Text style={styles.mapTitle}>Mapa padrão</Text>
            <MapView
              style={{ width: '100%', height: 400, marginTop: 20 }}
              showsUserLocation
              region={{
                ...region,
                latitudeDelta: 0.0121,
                longitudeDelta: 0.0015,
              }}
              onMapReady={() => {
                console.log("Mapa standart carregado");
              }}
              onRegionChangeComplete={(newRegion) => {
                console.log("Nova região: ", newRegion);
              }}
              onPress={(event) => {
                const coordinate = event.nativeEvent.coordinate;
                console.log("Coordenadas do toque: ", coordinate);
              }}
              mapType="standard"
              showsTraffic={true}
            >
              <Marker 
                coordinate={{ latitude: region.latitude, longitude: region.longitude }} 
                title={region.name}
                description="Essa é a localização atual da região que você escolheu"
                pinColor="#00FF00"
                image={require('../../../assets/images/marker/carro.png')}
              />
            </MapView>
          </View>

          <View>
            <Text style={styles.mapTitle}>Mapa satélite</Text>
            <MapView
              scrollEnabled={false}
              zoomEnabled={false}
              rotateEnabled={false}
              style={{ width: '100%', height: 400, marginTop: 20 }}
              region={{
                ...region,
                latitudeDelta: 0.0121,
                longitudeDelta: 0.0015,
              }}
              onMapReady={() => {
                console.log("Mapa satélite carregado");
              }}
              mapType="satellite"
            >
              <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }}>
                <Callout tooltip>
                  <View style={{backgroundColor: "#FFF", padding: 10, borderRadius: 10}}>
                    <Text>Callout customizado</Text>
                  </View>
                </Callout>
              </Marker>
            </MapView>
          </View>

          <View>
            <Text style={styles.mapTitle}>Mapa híbrido</Text>
            <MapView
              style={{ width: '100%', height: 400, marginTop: 20 }}
              region={{
                ...region,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onMapReady={() => {
                console.log("Mapa híbrido carregado");
              }}
              mapType="hybrid"
            >
              <Text style={{backgroundColor: "#FF0000", color: "#FFF", fontWeight: 700}}>Marker</Text>
            </MapView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
})