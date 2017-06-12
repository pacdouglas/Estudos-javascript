class HttpService{
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
}