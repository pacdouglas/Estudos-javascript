import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image
} from 'react-native';
import Topo from "./src/components/Topo"
import Icone from "./src/components/Icone"

export default class Jokepo extends Component {
  constructor(props) {
    super(props);
    this.state = { escolhaUsuario: "", escolhaComputador: "", resultado: "" };
  }

  jokepo(escolhaUsuario) {
    let escolhaComputador = Math.floor(Math.random() * 3);
    switch (escolhaComputador) {
      case 0: escolhaComputador = "Pedra"; break;
      case 1: escolhaComputador = "Papel"; break;
      case 2: escolhaComputador = "Tesoura"; break;
    }

    let resultado = "Você Perdeu!";
    if (escolhaComputador === escolhaUsuario) {
      resultado = "Empate!!!";
    } else {
      if (escolhaComputador === "Pedra") {
        if (escolhaUsuario === "Papel") {
          resultado = "Você venceu!";
        }
      }
      if (escolhaComputador === "Papel") {
        if (escolhaUsuario === "Tesoura") {
          resultado = "Você venceu!";
        }
      }
      if (escolhaComputador === "Tesoura") {
        if (escolhaUsuario === "Pedra") {
          resultado = "Você venceu!";
        }
      }
    }
    this.setState({ escolhaUsuario, escolhaComputador, resultado })
  }

  render() {
    return (
      <View>
        <Topo></Topo>
        <View style={styles.painelAcoes}>
          <View style={styles.btnEscolha}>
            <Button title="Pedra" onPress={() => this.jokepo("Pedra")} />
          </View>
          <View style={styles.btnEscolha}>
            <Button title="Papel" onPress={() => this.jokepo("Papel")} />
          </View>
          <View style={styles.btnEscolha}>
            <Button title="Tesoura" onPress={() => this.jokepo("Tesoura")} />
          </View>
        </View>

        <View style={styles.palco}>
          <Text style={styles.txtResultado}>{this.state.resultado}</Text>
          <Icone escolha={this.state.escolhaComputador} jogador="Computador" />
          <Icone escolha={this.state.escolhaUsuario} jogador="Você" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnEscolha: {
    width: 90
  },
  painelAcoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  palco: {
    alignItems: "center",
    marginTop: 10
  },
  txtResultado: {
    fontSize: 25,
    fontWeight: "bold",
    color: "red",
    height: 60
  }
});

AppRegistry.registerComponent('Jokepo', () => Jokepo);
