"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
    function NegociacaoController() {
        _classCallCheck(this, NegociacaoController);

        var $ = document.querySelector.bind(document);

        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($("#negociacoesView")), "adiciona", "esvazia", "ordena", "inverteOrdem");
        this._mensagem = new Bind(new Mensagem(), new MensagemView($("#mensagemView")), "texto");
        this._ordemAtual = '';

        this._init();
    }

    _createClass(NegociacaoController, [{
        key: "_init",
        value: function _init() {
            var _this = this;

            ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.listaTodos();
            }).then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    return _this._listaNegociacoes.adiciona(negociacao);
                });
            }).catch(function (erro) {
                return console.log(erro);
            });

            setInterval(function () {
                return _this._importaNegociacoes();
            }, 10000);
        }
    }, {
        key: "ordena",
        value: function ordena(coluna) {
            if (this._ordemAtual == coluna) {
                this._listaNegociacoes.inverteOrdem();
            } else {
                this._listaNegociacoes.ordena(function (a, b) {
                    return a[coluna] - b[coluna];
                });
            }
            this._ordemAtual = coluna;
        }
    }, {
        key: "_importaNegociacoes",
        value: function _importaNegociacoes() {
            var _this2 = this;

            var service = new NegociacaoService();

            Promise.all([service.obterNegociacoesDaSemana(), service.obterNegociacoesDaSemanaAnterior(), service.obterNegociacoesDaSemanaRetrasada()]).then(function (negociacoes) {
                return negociacoes.reduce(function (arrayAchatado, array) {
                    return arrayAchatado.concat(array);
                }, []).filter(function (negociacao) {
                    return !_this2._listaNegociacoes.negociacoes.some(function (negociacaoExistente) {
                        return JSON.stringify(negociacaoExistente) == JSON.stringify(negociacao);
                    });
                });
            }).then(function (negociacoes) {
                console.log(negociacoes);
                negociacoes.forEach(function (negociacao) {
                    return _this2._listaNegociacoes.adiciona(negociacao);
                });
            }).catch(function (error) {
                return _this2._mensagem.texto = error;
            });
        }
    }, {
        key: "adiciona",
        value: function adiciona(event) {
            var _this3 = this;

            event.preventDefault();
            var negociacao = this._criaNegociacao();

            new NegociacaoService().cadastra(negociacao).then(function (mensagem) {
                _this3._listaNegociacoes.adiciona(negociacao);
                _this3._mensagem.texto = mensagem;
                _this3._limpaFormulario();
            }).catch(function (erro) {
                return _this3._mensagem.texto = erro;
            });
        }
    }, {
        key: "apaga",
        value: function apaga(event) {
            var _this4 = this;

            ConnectionFactory.getConnection().then(function (connection) {
                new NegociacaoDao(connection).apagaTodos().then(function (mensagem) {
                    console.log(mensagem);
                    _this4._listaNegociacoes.esvazia();
                    _this4._mensagem.texto = "Lista das negociações apagadas com sucesso";
                });
            });
        }
    }, {
        key: "_criaNegociacao",
        value: function _criaNegociacao() {
            return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        }
    }, {
        key: "_limpaFormulario",
        value: function _limpaFormulario() {
            this._inputData.value = "";
            this._inputQuantidade.value = 1;
            this._inputValor.value = 0.0;
            this._inputData.focus();
        }
    }]);

    return NegociacaoController;
}();
//# sourceMappingURL=NegociacaoController.js.map