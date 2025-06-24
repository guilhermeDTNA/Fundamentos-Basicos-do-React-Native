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