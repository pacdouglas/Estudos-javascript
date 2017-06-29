import { List } from "immutable";

function trocaFoto(lista, fotoId, callbackAtualizaPropriedades) {
    const fotoEstadoAntigo = lista.find(foto => foto.id === fotoId);
    const novasPropriedades = callbackAtualizaPropriedades(fotoEstadoAntigo);

    const fotoEstadoNovo = Object.assign({}, fotoEstadoAntigo, novasPropriedades);
    const indiceDaLista = lista.findIndex(foto => foto.id === fotoId);
    return lista.set(indiceDaLista, fotoEstadoNovo);
}

//FUNÇÃO REDUTORA REDUCER
export function timeline(state = new List(), action) {
    if (action.type === "LISTAGEM") {
        console.log("Entrou na listagem");
        return new List(action.fotos);
    }

    if (action.type === "COMENTARIO") {
        const novoComentario = action.novoComentario;

        return trocaFoto(state, action.fotoId, (fotoEstadoAntigo) => {
            const novosComentarios = fotoEstadoAntigo.comentarios.concat(novoComentario);
            return { comentarios: novosComentarios };
        });
    }

    if (action.type === "LIKE") {
        return trocaFoto(state, action.fotoId, (fotoEstadoAntigo) => {
            const novoStadoDoLike = !fotoEstadoAntigo.likeada;
            const possivelLiker = fotoEstadoAntigo.likers.find(likerAtual => likerAtual.login === action.liker.login);

            let novosLikers;
            if (possivelLiker === undefined) {
                novosLikers = fotoEstadoAntigo.likers.concat(action.liker);
            } else {
                novosLikers = fotoEstadoAntigo.likers.filter(likerAtual => likerAtual.login !== action.liker.login);
            }

            return { likeada: novoStadoDoLike, likers: novosLikers };
        });
    }
    return state;
}