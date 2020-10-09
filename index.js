let quadrado = new Quadrado("#folha-de-desenho", 100);

const botaoIniciar = document.querySelector(".btn-iniciar");
const botaoResetar = document.querySelector(".btn-resetar");
const fps = document.querySelector(".sliderFPS");
const displayFPS = document.querySelector(".fps");

function criarQuadrado() {
    quadrado = new Quadrado("#folha-de-desenho", 100);
    quadrado.desenha();
    quadrado.cor("red");
}

criarQuadrado();

function iniciarAnimacao() {
    quadrado.resetaPosicaoInicial();
    criarQuadrado();
    quadrado.movimentaParaDireita();
}

fps.oninput = function() {
    displayFPS.textContent = fps.value
    iniciarAnimacao()
}


botaoIniciar.addEventListener("click", () => {
    console.log('iniciando');
    iniciarAnimacao();
});

botaoResetar.addEventListener("click", () => {
    console.log('resetando')
    quadrado.resetaPosicaoInicial();
    criarQuadrado();
});