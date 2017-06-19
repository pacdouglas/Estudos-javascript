import React, { Component } from 'react';
import InputCustomizado from "./componentes/InputCustomizado.js";
import PubSub from "pubsub-js";
import TratadorErros from "./TratadorErros";
import $ from 'jquery';

class FormularioAutor extends Component {
    constructor() {
        super();
        this.state = { lista: [], nome: '', email: '', senha: '' };
        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <InputCustomizado id="nome" label="Nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} />
                    <InputCustomizado id="email" label="Email" type="email" name="email" value={this.state.email} onChange={this.setEmail} />
                    <InputCustomizado id="senha" label="Senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} />

                    <div className="pure-control-group">
                        <label></label>
                        <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                    </div>
                </form>
            </div>
        );
    }

    enviaForm(event) {
        console.log("Enviando");
        event.preventDefault();

        $.ajax({
            url: "http://cdc-react.herokuapp.com/api/autores",
            contentType: "application/json",
            dataType: "json",
            type: "post",
            data: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha }),
            success: (resposta) => {
                console.log("Enviou");
                //this.props.callbackAtualizaListagem(resposta); Disparar broadcast
                this.setState({nome: '', email: '', senha: '' });
                PubSub.publish("atualiza-lista-autores",resposta);

            },
            error: (erro) => {
                console.log("Erro no envio");
                if(erro.status === 400){
                    new TratadorErros().publicaErros(erro.responseJSON);
                }
            },
            beforeSend: () => {
                PubSub.publish("limpa-erros",{});
            } 
        });
    }

    setNome(event) {
        this.setState({ nome: event.target.value })
    }
    setEmail(event) {
        this.setState({ email: event.target.value })
    }
    setSenha(event) {
        this.setState({ senha: event.target.value })
    }

}

class TabelaAutores extends Component {
    render() {
        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map(function (autor) {
                                return (
                                    <tr key={autor.id}>
                                        <td>{autor.nome}</td>
                                        <td>{autor.email}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default class AutorBox extends Component{
    constructor() {
        super();
        this.state = {lista: []};
    }
    componentDidMount() {
        $.ajax({
            url: "http://cdc-react.herokuapp.com/api/autores",
            dataType: "json",
            success: (resposta) => {
                this.setState({ lista: resposta.reverse() })
            }
        });

        PubSub.subscribe("atualiza-lista-autores", (topico, objeto) => {
            this.setState({lista: objeto.reverse()});
        });
    }
    render() {
        return (
            <div>
                <FormularioAutor/>
                <TabelaAutores lista={this.state.lista} />
            </div>
        );
    }
}