class NegociacaoService{

    constructor(){
        this._http = new HttpService();
    }

    cadastra(negociacao){
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() => "Negociação adicionada com sucesso")
            .catch(() => {throw new Error("Não foi possivel cadastrar a negociação")});
    }

    obterNegociacoesDaSemana(){
            return new Promise((resolve, reject)=>{
            this._http.getComApi("negociacoes/semana")
            .then(negociacoes => {
                resolve(negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
            })
            .catch(error=>reject("Não foi possível carregar as da Semana"))          
        });
    }

    obterNegociacoesDaSemanaAnterior(){
            return new Promise((resolve, reject)=>{
            this._http.getComApi("negociacoes/anterior")
            .then(negociacoes => {
                resolve(negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
            })
            .catch(error=>reject("Não foi possível carregar as da Semana Anterior"))          
        });
    }

    obterNegociacoesDaSemanaRetrasada(){
            return new Promise((resolve, reject)=>{
            this._http.getComApi("negociacoes/retrasada")
            .then(negociacoes => {
                resolve(negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
            })
            .catch(error=>reject("Não foi possível carregar as da Semana Retrasada"))          
        });
    }
}