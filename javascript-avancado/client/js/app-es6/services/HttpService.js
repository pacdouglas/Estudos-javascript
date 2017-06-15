class HttpService{

    getComApi(url){
        //fetch é global, api nova do javascript 2016, procure por polyfill para compatibilidade
        //com todos os navegadores
        return fetch(url)
                .then(res => {
                    if(res.ok)
                        return res.json();
                    else
                        throw new Error("Erro de Conexao " + res.statusText);
                });
    }

    get(url){
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        console.log("Obtendo informações do servidor");
                        resolve(JSON.parse(xhr.responseText));
                    }else{
                        console.log("Erro na conexão " + xhr.responseText);
                        reject(xhr.responseText);
                    }
                }
            };
            xhr.send();
        });
    }
    postComApi(url, dado){
        return fetch(url, {
            headers: {"Content-type" : "application/json"},
            method: "post",
            body: JSON.stringify(dado)
        })
        .then(res => {
            if(res.ok)
                return res.json();
            else
                throw new Error("Erro de Conexao " + res.statusText);
        });
    }

    post(url, dado) {

      return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = () => {

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
}