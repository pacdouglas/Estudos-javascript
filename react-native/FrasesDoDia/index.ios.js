import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Text,
  Alert
} from 'react-native';

export default class FrasesDoDia extends Component {
  gerarFrase(){
    const numAleatorio = Math.floor(Math.random()*5);
    
    let frases = [];
    frases[0] = 'aa';
    frases[1] = 'bb';
    frases[2] = 'cc';
    frases[3] = 'dd';
    frases[4] = 'ee';
    
    Alert.alert("Frase Gerada", frases[numAleatorio]);
  }

  render() {
    return (
      <View style={styles.principal}>
        <Image source={require('./imgs/logo.png')}/>
        <TouchableOpacity 
        onPress={this.gerarFrase}
        style={styles.botao}>
          <Text style={styles.textoBotao}>Nova Frase</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  principal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  botao: {
    backgroundColor: "#538530",
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 20
  },
  textoBotao: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  }
});

AppRegistry.registerComponent('FrasesDoDia', () => FrasesDoDia);
