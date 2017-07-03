import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class FrasesDoDia extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.estiloTexto}>
          Frases do Dia!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    height: 300,
    width: 300,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  estiloTexto: {
    fontSize: 20,
    backgroundColor: 'red',
    height: 30,
    width: 30
  }
});

AppRegistry.registerComponent('FrasesDoDia', () => FrasesDoDia);
