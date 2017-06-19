import React, { Component } from 'react';
import InputCustomizado from "./componentes/InputCustomizado.js";
import PubSub from "pubsub-js";
import $ from 'jquery';

class TabelaLivros extends Component {
    render() {
        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Preço</th>
                            <th>Autor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map(function (livro) {
                                return (
                                    <tr key={livro.id}>
                                        <td>{livro.titulo}</td>
                                        <td>{livro.preco}</td>
                                        <td>{livro.autor.nome}</td>
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

class FormularioLivro extends Component {
    constructor() {
        super();
        this.state = { titulo: '', preco: '', autorId: '' };
        this.enviaForm = this.enviaForm.bind(this);
        this.setTitulo = this.setTitulo.bind(this);
        this.setPreco = this.setPreco.bind(this);
        this.setAutorId = this.setAutorId.bind(this);
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <InputCustomizado id="titulo" label="Título" type="text" name="titulo" value={this.state.titulo} onChange={this.setTitulo} />
                    <InputCustomizado id="preco" label="Preço" type="number" name="preco" value={this.state.preco} onChange={this.setPreco} />
                    <div className="pure-control-group">
                        <label htmlFor="autorId">Autor</label>
                        <select value={this.state.autorId} id="autorId" name="autorId" onChange={this.setAutorId}>
                            <option>Selecione o autor</option>
                            {
                                this.props.autores.map(autor => {
                                    return <option key={autor.id} value={autor.id}>{autor.nome}</option>
                                })
                            }
                        </select>
                    </div>
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
            url: "http://cdc-react.herokuapp.com/api/livros",
            contentType: "application/json",
            dataType: "json",
            type: "post",
            data: JSON.stringify({ titulo: this.state.titulo, preco: this.state.preco, autorId: this.state.autorId }),
            success: (resposta) => {
                console.log("Enviou");
                this.setState({ titulo: '', preco: '', autorId: '' });
                PubSub.publish("atualiza-lista-livros", resposta);
            },
            error: (erro) => {
                console.log("Erro no envio");
            }
        });
    }

    setTitulo(event) {
        this.setState({ titulo: event.target.value })
    }
    setPreco(event) {
        this.setState({ preco: event.target.value })
    }
    setAutorId(event) {
        this.setState({ autorId: event.target.value })
    }
}

export default class LivroBox extends Component {
    constructor() {
        super();
        this.state = { lista: [] , autores: []};
    }
    componentDidMount() {
        $.ajax({
            url: "http://cdc-react.herokuapp.com/api/livros",
            dataType: "json",
            success: (resposta) => {
                this.setState({ lista: resposta.reverse() });
            }
        });

        $.ajax({
            url: "http://cdc-react.herokuapp.com/api/autores",
            dataType: "json",
            success: (resposta) => {
                this.setState({ autores: resposta.reverse() });
            }
        });

        PubSub.subscribe('atualiza-lista-livros', function (topico, novaLista) {
            this.setState({ lista: novaLista.reverse() });
        }.bind(this));
    }
    render() {
        return (
            <div>
                <div className="header">
                    <h1>Cadastro De Livro</h1>
                </div>
                <div className="content" id="content">
                    <FormularioLivro autores={this.state.autores}/>
                    <TabelaLivros lista={this.state.lista} />
                </div>
            </div>
        );
    }
}