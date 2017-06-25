import React, { Component } from 'react';
import FotoItem from './Foto';
import PubSub from "pubsub-js";
import ReactCSSTransitionGroup from "react/lib/ReactCSSTransitionGroup";

export default class Timeline extends Component {

    constructor(props) {
        super(props);
        this.state = { fotos: [] };
        this.login = props.login;
    }

    componentWillMount() {
        PubSub.subscribe("timeline", (nomeTopico, fotos) => {
            this.setState({ fotos: fotos.fotos });
        });

        PubSub.subscribe("atualiza-liker", (nomeTopico, infoLiker) => {
            const fotoAchada = this.state.fotos.find(foto => foto.id === infoLiker.fotoId);
            fotoAchada.likeada = !fotoAchada.likeada;
            const possivelLiker = fotoAchada.likers.find(liker => liker.login === infoLiker.likeador.login);

            if (possivelLiker === undefined) {
                fotoAchada.likers.push(infoLiker.likeador);
            } else {
                fotoAchada.likers = fotoAchada.likers.filter(liker => liker.login !== infoLiker.likeador.login);
            }

            this.setState({ fotos: this.state.fotos });
        });

        PubSub.subscribe("novos-comentarios", (nomeTopico, novoComentario) => {
            const fotoAchada = this.state.fotos.find(foto => foto.id === novoComentario.fotoId);
            fotoAchada.comentarios.push(novoComentario.novoComentario);
            this.setState({ fotos: this.state.fotos });
        });
    }

    carregaFotos() {
        let urlPerfil = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        if (this.login !== undefined) {
            urlPerfil = `http://localhost:8080/api/public/fotos/${this.login}`;
        }
        fetch(urlPerfil)
            .then(response => response.json())
            .then(fotos => {
                this.setState({ fotos: fotos });
            });
    }
    componentDidMount() {
        this.carregaFotos();
    }

    componentWillReceiveProps(nextProps) {
        this.login = nextProps.login;
        this.carregaFotos(nextProps);
    }

    like(fotoId) {
        fetch(`http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem("auth-token")}`, { method: "POST" })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Não foi possível realizer o like da foto");
                }
            })
            .then(likeador => {
                PubSub.publish("atualiza-liker", { fotoId: fotoId, likeador });
            });
    }

    comenta(fotoId, textoComentario) {
        const requestInfo = {
            method: "POST",
            body: JSON.stringify({ texto: textoComentario }),
            headers: new Headers({ "Content-type": "application/json" })
        }
        fetch(`http://localhost:8080/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${localStorage.getItem("auth-token")}`, requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Não foi possível comentar");
                }
            })
            .then(novoComentario => {
                PubSub.publish("novos-comentarios", { fotoId, novoComentario });
            });
    }
    render() {
        return (

            <div className="fotos container">
                <ReactCSSTransitionGroup
                    transitionName="timeline"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {
                        this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto} comenta={this.comenta} like={this.like} />)
                    }
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}