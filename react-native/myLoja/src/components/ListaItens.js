import React, { Component } from 'react';
import Itens from "./Itens";
import {
    StyleSheet,
    ScrollView
} from 'react-native';
import axios from "axios";

export default class ListaItens extends Component {
    constructor(props){
        super(props);
        this.state = {listaItens: []}
    }
    componentWillMount() {
        axios.get("http://faus.com.br/recursos/c/dmairr/api/itens.html")
            .then((response) => {this.setState({listaItens: response.data})})
            .catch((err) => {console.log(`Erro na requisição: ${err}`)})
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                {this.state.listaItens.map((item, i) => <Itens key={i} item={item}/>)}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#DDD",
        paddingTop: 20  
    }
});