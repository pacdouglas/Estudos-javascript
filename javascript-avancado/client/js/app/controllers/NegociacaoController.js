class NegociacaoController{
    constructor(){
        let $ = document.querySelector.bind(document);

        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), 
                                            new NegociacoesView($("#negociacoesView"))
                                            , "adiciona","esvazia", "ordena",  "inverteOrdem");
        this._mensagem = new Bind(new Mensagem(), new MensagemView($("#mensagemView")), "texto");

        this._ordemAtual = '';
        
    }

    ordena(coluna) {
       if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);    
        }
        this._ordemAtual = coluna;
    }

    importaNegociacoes(){
        let service = new NegociacaoService();

        Promise.all([service.obterNegociacoesDaSemana(), 
                    service.obterNegociacoesDaSemanaAnterior(),
                    service.obterNegociacoesDaSemanaRetrasada()])
                .then(negociacoes => {
                    console.log(negociacoes);
                    negociacoes
                    .reduce((arrayAchatado, array) => arrayAchatado.concat(array),[])
                    .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                })
                .catch(error => this._mensagem.texto = error);
    }

    adiciona(event){
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());

        this._limpaFormulario();
        this._mensagem.texto = "Negociação adicionada com sucesso";
    }

    apaga(event){
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = "Lista das negociações apagadas com sucesso";
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