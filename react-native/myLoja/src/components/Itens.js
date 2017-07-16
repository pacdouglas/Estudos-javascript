import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

export default class ListaItens extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoView}>
                    <Image style={styles.logoImage} source={{ uri: this.props.item.foto }} />
                </View>
                <View style={styles.textosDetalhes}>
                    <Text style={styles.txtTitulo}>{this.props.item.titulo}</Text>
                    <Text style={styles.txtValor}>R$ {this.props.item.valor}</Text>
                    <Text style={styles.txtGeral}>Local: {this.props.item.local_anuncio}</Text>
                    <Text style={styles.txtGeral}>Data da publicação: {this.props.item.data_publicacao}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    txtDetalhes: {
        fontSize: 14
    },
    txtValor: {
        fontSize: 16,
        fontWeight: "bold"
    },
    txtTitulo: {
        fontSize: 18,
        color: "blue",
        marginBottom: 5
    },
    container: {
        backgroundColor: "#FFF",
        borderWidth: 0.5,
        borderColor: "#999",
        margin: 10,
        padding: 10,
        flexDirection: "row"
    },
    logoView: {
        width: 102,
        height: 102
    },
    logoImage: {
        height: 100,
        width: 100
    },
    textosDetalhes: {
        marginLeft: 20,
        flex: 1
    }
});