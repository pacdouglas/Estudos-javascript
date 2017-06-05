$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function buscaFrase(){
    $("#spinner").show();
    var fraseId = $("#frase-id").val();
    var dados = {id: fraseId};
    $.get("http://localhost:3000/frases", dados, trocaFrase)
    .fail(fraseErro)
    .always(fraseSempre);
}

function trocaFrase(jsonData){
    var frase = $(".frase");
   
    frase.text(jsonData.texto);
    atualizaTamanhoFrase();
    atualizaTempoFrase(jsonData.tempo);
}

function fraseAleatoria(){
    $("#spinner").show();
    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
    .fail(fraseErro)
    .always(fraseSempre);
}

function fraseSempre(){
    $("#spinner").hide();
}

function fraseErro(){
    $("#erro").show();
    setTimeout(function(){
        $("#erro").hide();
    }, 2000);
}

function trocaFraseAleatoria(jsonData){
    var frase = $(".frase");
    var numAleatorio = Math.floor((Math.random() * jsonData.length));
    frase.text(jsonData[numAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoFrase(jsonData[numAleatorio].tempo);
}