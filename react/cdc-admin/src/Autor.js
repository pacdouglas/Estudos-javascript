import React, { Component } from 'react';
import InputCustomizado from "./componentes/InputCustomizado.js";
import PubSub from "pubsub-js";
import TratadorErros from "./TratadorErros";
import $ from 'jquery';

class FormularioAutor extends Component {
    constructor() {
        super();
        this.state = { nome: '', email: '', senha: '' };
        this.enviaForm = this.enviaForm.bind(this);
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <InputCustomizado id="nome" label="Nome" type="text" name="nome" value={this.state.nome} onChange={this.salvaAlteracao.bind(this, "nome")} />
                    <InputCustomizado id="email" label="Email" type="email" name="email" value={this.state.email} onChange={this.salvaAlteracao.bind(this, "email")} />
                    <InputCustomizado id="senha" label="Senha" type="password" name="senha" value={this.state.senha} onChange={this.salvaAlteracao.bind(this, "senha")} />

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
                this.setState({ nome: '', email: '', senha: '' });
                PubSub.publish("atualiza-lista-autores", resposta);

            },
            error: (erro) => {
                console.log("Erro no envio");
                if (erro.status === 400) {
                    new TratadorErros().publicaErros(erro.responseJSON);
                }
            },
            beforeSend: () => {
                PubSub.publish("limpa-erros", {});
            }
        });
    }
    salvaAlteracao(nomeInput, evento) {
        let json = {};
        json[nomeInput] = evento.target.value;
        this.setState(json);
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

export default class AutorBox extends Component {
    constructor() {
        super();
        this.state = { lista: [] };
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
            this.setState({ lista: objeto.reverse() });
        });
    }
    render() {
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de Autores</h1>
                </div>
                <div className="content" id="content">
                    <FormularioAutor />
                    <TabelaAutores lista={this.state.lista} />
                </div>
            </div>
        );
    }
}