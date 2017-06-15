"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpService = function () {
    function HttpService() {
        _classCallCheck(this, HttpService);
    }

    _createClass(HttpService, [{
        key: "getComApi",
        value: function getComApi(url) {
            //fetch é global, api nova do javascript 2016, procure por polyfill para compatibilidade
            //com todos os navegadores
            return fetch(url).then(function (res) {
                if (res.ok) return res.json();else throw new Error("Erro de Conexao " + res.statusText);
            });
        }
    }, {
        key: "get",
        value: function get(url) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            console.log("Obtendo informações do servidor");
                            resolve(JSON.parse(xhr.responseText));
                        } else {
                            console.log("Erro na conexão " + xhr.responseText);
                            reject(xhr.responseText);
                        }
                    }
                };
                xhr.send();
            });
        }
    }, {
        key: "postComApi",
        value: function postComApi(url, dado) {
            return fetch(url, {
                headers: { "Content-type": "application/json" },
                method: "post",
                body: JSON.stringify(dado)
            }).then(function (res) {
                if (res.ok) return res.json();else throw new Error("Erro de Conexao " + res.statusText);
            });
        }
    }, {
        key: "post",
        value: function post(url, dado) {

            return new Promise(function (resolve, reject) {

                var xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.onreadystatechange = function () {

                    if (xhr.readyState == 4) {

                        if (xhr.status == 200) {

                            resolve(JSON.parse(xhr.responseText));
                        } else {

                            reject(xhr.responseText);
                        }
                    }
                };
                xhr.send(JSON.stringify(dado)); // usando JSON.stringifly para converter objeto em uma string no formato JSON.
            });
        }
    }]);

    return HttpService;
}();
//# sourceMappingURL=HttpService.js.map