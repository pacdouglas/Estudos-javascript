"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = function () {
    function NegociacaoService() {
        _classCallCheck(this, NegociacaoService);

        this._http = new HttpService();
    }

    _createClass(NegociacaoService, [{
        key: "cadastra",
        value: function cadastra(negociacao) {
            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.adiciona(negociacao);
            }).then(function () {
                return "Negociação adicionada com sucesso";
            }).catch(function () {
                throw new Error("Não foi possivel cadastrar a negociação");
            });
        }
    }, {
        key: "obterNegociacoesDaSemana",
        value: function obterNegociacoesDaSemana() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _this._http.getComApi("negociacoes/semana").then(function (negociacoes) {
                    resolve(negociacoes.map(function (obj) {
                        return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
                    }));
                }).catch(function (error) {
                    return reject("Não foi possível carregar as da Semana");
                });
            });
        }
    }, {
        key: "obterNegociacoesDaSemanaAnterior",
        value: function obterNegociacoesDaSemanaAnterior() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2._http.getComApi("negociacoes/anterior").then(function (negociacoes) {
                    resolve(negociacoes.map(function (obj) {
                        return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
                    }));
                }).catch(function (error) {
                    return reject("Não foi possível carregar as da Semana Anterior");
                });
            });
        }
    }, {
        key: "obterNegociacoesDaSemanaRetrasada",
        value: function obterNegociacoesDaSemanaRetrasada() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                _this3._http.getComApi("negociacoes/retrasada").then(function (negociacoes) {
                    resolve(negociacoes.map(function (obj) {
                        return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
                    }));
                }).catch(function (error) {
                    return reject("Não foi possível carregar as da Semana Retrasada");
                });
            });
        }
    }]);

    return NegociacaoService;
}();
//# sourceMappingURL=NegociacaoService.js.map