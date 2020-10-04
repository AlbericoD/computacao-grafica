let quadrado = new Quadrado("#folha-de-desenho", 100);

const botaoIniciar = document.querySelector(".btn-iniciar");
const botaoResetar = document.querySelector(".btn-resetar");

function criarQuadrado() {
  quadrado = new Quadrado("#folha-de-desenho", 100);
  quadrado.desenha();
  quadrado.cor("red");
}

criarQuadrado();

botaoIniciar.addEventListener("click", () => {
  quadrado.resetaPosicaoInicial();
  criarQuadrado();
  quadrado.movimentaParaDireita();
});

botaoResetar.addEventListener("click", () => {
  quadrado.resetaPosicaoInicial();
  criarQuadrado();
});
