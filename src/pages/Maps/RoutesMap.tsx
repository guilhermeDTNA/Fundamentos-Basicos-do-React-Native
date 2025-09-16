import { GOOGLE_MAPS_API_KEY } from '@env';
import Geolocation from "@react-native-community/geolocation";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { RegionProps } from ".";
import { getPixel } from '../../common/utils';

export default function RoutesMap(){
  const [region, setRegion] = useState<RegionProps>({
    name: "",
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0121,
    longitudeDelta: 0.0015,
  });

  const [destLocation, setDestLocation] = useState<RegionProps | null>(null);
  const [mapView, setMapView] = useState<any>(useRef<MapView>(null));

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
        enableHighAccuracy: true,
        maximumAge: 1000
      }
    }

    getPosition();
  }, [])

  return(
    <>
      <MapView
        style={{ width: '100%', height: 400, marginTop: 20, flex: 1 }}
        showsUserLocation
        region={region}
        mapType="standard"
        showsTraffic={true}
        ref={ref => setMapView(ref)}
      >
        {destLocation && <MapViewDirections
          origin={region}
          destination={destLocation}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={3}
          strokeColor="hotpink"
          onReady={result => {
            mapView.current?.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: getPixel(50) ?? 0,
                left: getPixel(50) ?? 0,
                top: getPixel(50) ?? 0,
                bottom: getPixel(50) ?? 0
              }
            })
          }}
        />}
      </MapView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.localView}>
            <TouchableOpacity style={styles.localBtn} onPress={() => setDestLocation({
              latitude: -18.2465101,
              longitude: -43.6032658,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            })}>
              <Text style={styles.localText}>Farmácia</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.localView}>
            <TouchableOpacity style={styles.localBtn} onPress={() => setDestLocation({
              latitude: -18.2401216,
              longitude: -43.6197781,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            })}>
              <Text style={styles.localText}>Supermercado</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.localView}>
            <TouchableOpacity style={styles.localBtn} onPress={() => setDestLocation({
              latitude: -18.2400174,
              longitude: -43.6269871,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            })}>
              <Text style={styles.localText}>Posto de gasolina</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.localView}>
            <TouchableOpacity style={styles.localBtn} onPress={() => setDestLocation({
              latitude: -18.2394436,
              longitude: -43.6007434,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            })}>
              <Text style={styles.localText}>Hospital</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.localView}>
            <TouchableOpacity style={styles.localBtn} onPress={() => setDestLocation({
              latitude: -18.2317144,
              longitude: -43.6092376,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            })}>
              <Text style={styles.localText}>Cinema</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    top: 30,
    margin: 10,
    height: 70
  },
  localView: {
    height: 400,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  localBtn: {
    height: 40,
    backgroundColor: "#FF0000",
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  localText: {
    color: "#FFF"
  }
})