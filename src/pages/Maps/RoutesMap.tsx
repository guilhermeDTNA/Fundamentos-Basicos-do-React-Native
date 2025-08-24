import Geolocation from "@react-native-community/geolocation";
import { useEffect, useState } from "react";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_API_KEY } from '@env';
import { RegionProps } from ".";

export default function RoutesMap(){
  const [region, setRegion] = useState<RegionProps>({
    name: "",
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0121,
    longitudeDelta: 0.0015,
  });

  const [destLocation, setDestLocation] = useState<RegionProps | null>(null);

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
    <MapView
      style={{ width: '100%', height: 400, marginTop: 20 }}
      showsUserLocation
      region={region}
      mapType="standard"
      showsTraffic={true}
    >
      {destLocation && <MapViewDirections
        origin={region}
        destination={destLocation}
        apikey={GOOGLE_MAPS_API_KEY}
        strokeWidth={3}
        strokeColor="hotpink"
      />}
    </MapView>
  )
}