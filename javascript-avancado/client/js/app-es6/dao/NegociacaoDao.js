class NegociacaoDao{
    constructor(connection){
        this._connection = connection;
        this._store = "negociacoes";
    }

    adiciona(negociacao){
        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store] , "readwrite")
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = (e) => {
                resolve();
            };

            request.onerror = (e) => {
                console.log(e.target.error);
                reject("Não foi possivel adicionar");
            }

        });
    }

    listaTodos(){
        return new Promise((resolve, reject) => {
            let cursor = this._connection
                .transaction([this._store] , "readwrite")
                .objectStore("negociacoes")
                .openCursor();

            let negociacoes = [];
            cursor.onsuccess = e => {
                let atual = e.target.result;
                if(atual){
                    let dado = atual.value;
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                    atual.continue();
                }else{
                    console.log(negociacoes);
                    resolve(negociacoes);
                }
            };
            cursor.onerror = e => {
                console.error(e.target.error);
                reject("num vai da nao");
            };
        })
    }

    apagaTodos(){
        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store] , "readwrite")
                .objectStore("negociacoes")
                .clear();
            
            request.onsuccess = e => resolve("Apagou tudo");
            request.onerror = e => reject("Num apagou tudo");
        });
    }
}