let taxa = 0.052;

function calcular() {
    let valorInput = document.querySelector("#valor");
    let mesInput = document.querySelector("#mes");
    let respostaLabel = document.querySelector("#resposta");

    let valor = parseInt(valorInput.value);
    let mes = parseInt(mesInput.value);

    let resposta = "Zoa não parceiro";

    if(resposta) {
        resposta = `R: ${valor * taxa * mes}`;
    }

    respostaLabel.innerHTML = resposta;
}