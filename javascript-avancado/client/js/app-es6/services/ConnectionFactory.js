var ConnectionFactory = (function () {
    const stores = ["negociacoes"]
    const versions = 4
    const dbName = "aluraframe";

    var connection = null;
    var close = null;

    return class ConnectionFactory{
        constructor(){
            throw new Error("Singleton");
        } 
        static getConnection(){
            return new Promise((resolve, reject) => {
                var openRequest = window.indexedDB.open(dbName, versions);

                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._createStores(e.target.result);
                };

                openRequest.onsuccess = e => {
                    if(!connection) {
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        connection.close = () => {throw new Error("num vai da nao")};
                    }
                        
                    resolve(connection);
                };

                openRequest.onerror = e => {
                    console.log(e.target.error);
                    reject(e.target.error.name);
                };
            });
        }

        static closeConnection(){
            if(connection){
                close();
                close = null;
            }
            connection = null;
        }

        static _createStores(connection){
            stores.forEach(store => {
                        if(connection.objectStoreNames.contains(store))
                            connection.deleteObjectStore(store);
                        connection.createObjectStore(store, {autoIncrement: true});
            });
        }
    }
})();
