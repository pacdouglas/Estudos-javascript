import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

export default class Icone extends Component {
    render() {
        let imageFun;
        switch (this.props.escolha) {
            case "Pedra": imageFun = require(`../../imgs/pedra.png`); break;
            case "Papel": imageFun = require(`../../imgs/papel.png`); break;
            case "Tesoura": imageFun = require(`../../imgs/tesoura.png`); break;
        }

        if (this.props.escolha === "") {
            return (
                <View style={styles.icone}>
                </View>
            );
        } else {
            return (
                <View style={styles.icone}>
                    <Text style={styles.txtJogador}>{this.props.jogador}</Text>
                    <Image source={imageFun} />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    txtJogador: {
        fontSize: 20
    },
    icone: {
        alignItems: "center",
        marginBottom: 20
    }
});