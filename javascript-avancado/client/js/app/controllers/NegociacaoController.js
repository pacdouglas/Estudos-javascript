class NegociacaoController{
    constructor(){
        let $ = document.querySelector.bind(document);

        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        let self = this;
        this._listaNegociacoes = new Proxy(new ListaNegociacoes(),{
            get(target, prop, receiver){
                if(["adiciona", "esvazia"].includes(prop) && (typeof(target[prop]) == typeof(Function))){
                    return function (){
                        Reflect.apply(target[prop], target, arguments);
                        self._negociaciesView.update(target);
                    }
                }
                
                return Reflect.get(target, prop, receiver);
            }
        });


        this._negociaciesView = new NegociacoesView($("#negociacoesView"));
        this._negociaciesView.update(this._listaNegociacoes);
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($("#mensagemView"));
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event){
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());

        this._limpaFormulario();
        this._mensagem.texto = "Negociação adicionada com sucesso";
        this._mensagemView.update(this._mensagem);
    }

    apaga(event){
        this._listaNegociacoes.esvazia();

        this._mensagem.texto = "Lista das negociações apagadas com sucesso";
        this._mensagemView.update(this._mensagem);
    }

    _criaNegociacao(){
        return new Negociacao(DateHelper.textoParaData(this._inputData.value),
                                        this._inputQuantidade.value,
                                        this._inputValor.value);
    }
    _limpaFormulario(){
        this._inputData.value = "";
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0
        this._inputData.focus();
    }
}