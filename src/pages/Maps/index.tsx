import Geolocation from '@react-native-community/geolocation';
import { Picker } from "@react-native-picker/picker";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Callout, Marker } from 'react-native-maps';
import { globalStyles } from "../../common/styles/global";

export interface RegionProps{
    name?: string;
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }

export default function Maps(){
  const regions: RegionProps[] = [
    {
      name: "Diamantina",
      latitude: -18.2339566,
      longitude: -43.6087307,
      latitudeDelta: 0.0121,
      longitudeDelta: 0.0015
    },
    {
      name: "Curvelo",
      latitude: -18.8062759,
      longitude: -44.4130455,
      latitudeDelta: 0.0121,
      longitudeDelta: 0.0015
    },
    {
      name: "Formiga",
      latitude: -20.0664842,
      longitude: -50.0532568,
      latitudeDelta: 0.0121,
      longitudeDelta: 0.0015
    }
  ]

  const [region, setRegion] = useState<RegionProps>(regions[0]);
  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    async function getPosition(){
      await Geolocation.getCurrentPosition(async ({
        coords: {latitude, longitude}
      }) => {
        setRegion({...region, name: "Atual", latitude, longitude});
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
              region={region}
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
              region={region}
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
              region={region}
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

      <TouchableOpacity onPress={() => navigation.navigate('Rotas')}>
        <Text>Traçar rotas no Google Maps</Text>
      </TouchableOpacity>
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