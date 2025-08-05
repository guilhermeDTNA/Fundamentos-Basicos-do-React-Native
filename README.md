Instalação e execução:

Obs.: instalar e configurar o android studio, bem como um emulador. <br />
Versão do JDK recomendado: <b>java-1.17.0-openjdk-amd64</b>.

```console
$ npm install
$ npx react-native start
$ npx react-native run-android
```

Para build do app:

Criar o diretório android/keystore.properties, com o seguinte conteúdo - <strong>alterar para as informações cadastradas no momento da criação da key store</strong> (vide: <a href="https://reactnative.dev/docs/signed-apk-android" target="_blank">https://reactnative.dev/docs/signed-apk-android</a>):

```console
MYAPP_UPLOAD_STORE_FILE=STORE_FILE
MYAPP_UPLOAD_KEY_ALIAS=KEY_ALIAS
MYAPP_UPLOAD_STORE_PASSWORD=STORE_PASSWORD
MYAPP_UPLOAD_KEY_PASSWORD=KEY_PASSWORD
```

Gerando nova release:

Altere a versão através da propriedade <strong>versionName</strong> no arquivo: ```/android/app/build.gradle```

após isso, execute o comando:

```console
$ cd /android
$ ./gradlew assembleRelease
```

pode ser necessário rodar este comando, caso o comando acima dê problema:

```console
$ cd /android
$ npx react-native build-android --mode=release
```

Para funcionamento do Google Maps, crie uma credencial no <a href="https://console.cloud.google.com/" target="_blank">Google Cloud Console</a>, com as APIs <strong>Maps SDK for Android</strong> e <strong>Maps ASK for iOS</strong> ativas, e adicione-a no arquivo: ```/android/gradle.properties``` da seguinte maneira:

```console
GOOGLE_MAPS_API_KEY=SUA_API_KEY
```