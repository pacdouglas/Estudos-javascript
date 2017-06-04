
var pacientes = document.querySelectorAll(".paciente");
for(var i = 0; i < pacientes.length; i++){
    var paciente = pacientes[i];

    var peso = paciente.querySelector(".info-peso").textContent;
    var altura = paciente.querySelector(".info-altura").textContent;
    var imc = paciente.querySelector(".info-imc");
    imc.textContent = calculaImc(peso, altura);
}

function calculaImc(peso, altura){
    return (peso / (altura * altura)).toFixed(2);
}