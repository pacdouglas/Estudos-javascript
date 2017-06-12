class NegociacaoService{

    obterNegociacoesDaSemana(cb){
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "negociacoes/semana");
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    console.log("Obtendo informações do servidor");
                    cb(null, 
                    JSON.parse(xhr.responseText)
                    .map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
                }else{
                    console.log("Erro na conexão " + xhr.responseText);
                    cb("Não foi possível obter as negociações");
                }
            }
        };
        xhr.send();
    }
}