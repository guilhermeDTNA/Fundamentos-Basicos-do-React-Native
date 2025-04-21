import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface StateProps{
  input?: string;
  name?: string;
}

export default class StorageAsClass extends Component<{}, StateProps>{
  constructor(props: any){
    super(props);
    this.state = {
      input: '',
      name: ''
    }

    this.setName = this.setName.bind(this);
  }

  componentDidMount(): void {
    AsyncStorage.getItem('name').then((value) => {
      this.setState({ name: value as string });
    })
  }

  componentDidUpdate(_: Readonly<{}>, prevState: Readonly<StateProps>): void{
    const name = this.state.name;

    if(prevState !== name){
      AsyncStorage.setItem('name', name as string);
    }
  }

  setName(){
    this.setState((prevState) => {
      const inputValue = prevState.input ?? '';
      return { name: inputValue };
    });
  }

  render(){
    return (
      <>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            value={this.state.input}
            onChangeText={(text) => this.setState({ input: text })}
            style={styles.inputName}
            underlineColorAndroid='transparent'
          />
          <TouchableOpacity onPress={this.setName}>
            <Text style={styles.btnAdd}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={{
            fontSize: 32
          }}>{this.state.name}</Text>
      </>
    )
  }
}

const styles = StyleSheet.create({
  btnAdd: {
    backgroundColor: '#000',
    color: '#FFF',
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
    padding: 5,
    marginHorizontal: 10,
    marginTop: 10,
  },
  inputName: {
    borderWidth: 1,
    borderColor: '#000',
    flex: 10
  }
})