
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class NumerosAleatorios extends Component {
  gerarNumAleatorio(){
    alert(Math.floor(Math.random() * 10));
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Gerador de Numero Randomico
        </Text>
        <Button title="Gerar" onPress={this.gerarNumAleatorio}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('NumerosAleatorios', () => NumerosAleatorios);
