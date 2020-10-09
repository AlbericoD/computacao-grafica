let quadrado = new Quadrado("#folha-de-desenho", 100);

const botaoIniciar = document.querySelector(".btn-iniciar");
const botaoResetar = document.querySelector(".btn-resetar");
const slidePosicaoEmY = document.querySelector(".sliderY");
const slidePosicaoEmX = document.querySelector(".sliderX");
const displayFPS = document.querySelector(".fps");
const fps = document.querySelector(".sliderFPS");
const codigo = document.querySelector(".codigo")

quadrado.informacaoEmY.textContent = slidePosicaoEmY.value
quadrado.informacaoEmX.textContent = slidePosicaoEmX.value

function criarQuadrado() {
    quadrado = new Quadrado("#folha-de-desenho", 100);
    quadrado.desenha();
    quadrado.cor("red");
    slidePosicaoEmY.setAttribute("max", quadrado.canvas.height - 100);
    slidePosicaoEmX.setAttribute("max", quadrado.canvas.width - 100);
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

slidePosicaoEmY.oninput = function() {
    quadrado.limpaDesenho()
    quadrado.position.y = parseInt(slidePosicaoEmY.value)
    console.log('DESENHO EM Y: ', quadrado.position.y)
    quadrado.informacaoEmY.textContent = slidePosicaoEmY.value
    quadrado.desenha()
}

slidePosicaoEmX.oninput = function() {
    quadrado.limpaDesenho()
    quadrado.position.x = parseInt(slidePosicaoEmX.value)
    console.log('DESENHO EM X: ', quadrado.position.x)
    quadrado.informacaoEmX.textContent = slidePosicaoEmX.value
    quadrado.desenha()
}

botaoIniciar.addEventListener("click", () => {
    console.log('iniciando');
    iniciarAnimacao();
});

botaoResetar.addEventListener("click", () => {
    console.log('resetando')
    quadrado.informacaoEmX.textContent = 0;
    quadrado.informacaoEmY.textContent = 0;
    quadrado.position.x = 0;
    quadrado.position.y = 0;
    slidePosicaoEmX.value = 0;
    slidePosicaoEmY.value = 0;
    quadrado.ehQuadrado = true;

    quadrado.resetaPosicaoInicial();
    criarQuadrado();
});

codigo.textContent = 'Código Fonte Aberto e Gratuito.'
codigo.setAttribute("href", "https://github.com/AlbericoD/computacao-grafica")