$("#botao-placar").click(mostraplacar);
$("#botao-sync").click(sincronizaPlacar);

function atualizaPlacar(){
    $.get("http://localhost:3000/placar", function(data){
        $(data).each(function (){
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find(".botao-remover").click(removeLinha);
            $("tbody").append(linha);
        });
    });
}

function sincronizaPlacar(){
    var placar = [];
    var linha = $("tbody>tr");
    linha.each(function (){
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();
        var score = {
            usuario: usuario,
            pontos: palavras
        }
        placar.push(score);
    });

    var dados = {
        placar: placar
    }
    $.post("http://localhost:3000/placar", dados, function (){
        console.log("salvou o placar no servidor.");
        $(".tooltip").tooltipster("open");
    }).always(function (){
        setTimeout(function (){
            $(".tooltip").tooltipster("close");
        }, 2000);
    });
}

function mostraplacar(){
    $(".placar").stop().slideToggle(600);
}

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = $("#usuarios").val();
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.append(linha);
    $(".placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar(){
    var posicaoPlacar = $(".placar").offset().top;
    $("body").animate(
    {
        scrollTop: posicaoPlacar + "px"
    }, 1000);
}

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha() {
    event.preventDefault();
    var linha = $(this).parent().parent();
    linha.fadeOut(1000);
    setTimeOut(function(){
        linha.remove()
    }, 1000);

}
