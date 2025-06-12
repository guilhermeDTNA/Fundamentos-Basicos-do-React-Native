import { useState } from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { CameraOptions, ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
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
    </SafeAreaView>
  )
}

