var inputFiltro = document.querySelector("#filtro-paciente");

inputFiltro.addEventListener("input", function(){
    var tabelaPacientes = document.querySelectorAll(".paciente");
    
    if(inputFiltro.value.length == 0){
        tabelaPacientes.forEach(function(paciente){
            paciente.classList.remove("invisivel");
        });
    }else{
        tabelaPacientes.forEach(function(paciente){
            var expressao = new RegExp(inputFiltro.value, "i");
            var nome = paciente.querySelector(".info-nome").textContent;

            if(expressao.test(nome)){
                paciente.classList.remove("invisivel");
            }else{
                paciente.classList.add("invisivel");
            }
        });
    }
});