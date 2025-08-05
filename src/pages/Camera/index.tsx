import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { CameraOptions, ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import MapView from 'react-native-maps';
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
  
  function changeRegion(name: string){
    const index = regions.findIndex(region => region.name === name);
    if(index !== -1) setRegion(regions[index]);
  }

  return(
    <SafeAreaView style={globalStyles.container}>
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

        <MapView
        style={{ width: '100%', height: 400, marginTop: 20 }}
        region={{
          ...region,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      </View>
    </SafeAreaView>
  )
}

