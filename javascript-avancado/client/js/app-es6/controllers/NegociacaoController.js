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
        
        this._init();
    }

    _init(){
        ConnectionFactory.getConnection()
        .then(connection => new NegociacaoDao(connection))
        .then(dao => dao.listaTodos())
        .then(negociacoes => 
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)))
        .catch(erro => console.log(erro));
        
        setInterval(() => this._importaNegociacoes(),10000)
    }

    ordena(coluna) {
       if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);    
        }
        this._ordemAtual = coluna;
    }

    _importaNegociacoes(){
        let service = new NegociacaoService();

        Promise.all([service.obterNegociacoesDaSemana(), 
                    service.obterNegociacoesDaSemanaAnterior(),
                    service.obterNegociacoesDaSemanaRetrasada()])
                .then(negociacoes => negociacoes
                    .reduce((arrayAchatado, array) => arrayAchatado.concat(array),[])
                    .filter(negociacao => 
                    !this._listaNegociacoes.negociacoes.some(negociacaoExistente =>
                    JSON.stringify(negociacaoExistente) == JSON.stringify(negociacao))))
                .then(negociacoes => {
                    console.log(negociacoes);
                    negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                })
                .catch(error => this._mensagem.texto = error);
    }

    adiciona(event){
        event.preventDefault();
        let negociacao = this._criaNegociacao();

        new NegociacaoService()
        .cadastra(negociacao)
        .then(mensagem => {
            this._listaNegociacoes.adiciona(negociacao);
            this._mensagem.texto = mensagem;
            this._limpaFormulario();
        })
        .catch(erro => this._mensagem.texto = erro);
    }

    apaga(event){
        ConnectionFactory.getConnection().then(connection => {
            new NegociacaoDao(connection)
            .apagaTodos()
            .then(mensagem => {
                console.log(mensagem);
                this._listaNegociacoes.esvazia();
                this._mensagem.texto = "Lista das negociações apagadas com sucesso";
            });
        });
    }

    _criaNegociacao(){
        return new Negociacao(DateHelper.textoParaData(this._inputData.value),
                                        parseInt(this._inputQuantidade.value),
                                        parseFloat(this._inputValor.value));
    }
    _limpaFormulario(){
        this._inputData.value = "";
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0
        this._inputData.focus();
    }
}