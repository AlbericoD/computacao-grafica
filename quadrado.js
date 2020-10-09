class Quadrado {
    heightRatio = 1.5;
    constructor(seletor, tamanho, posicao) {
        this.canvas = document.querySelector(seletor);
        this.informacaoEmX = document.querySelector(".posicaoX");
        this.informacaoEmY = document.querySelector(".posicaoY");
        this.informacaoTamanho = document.querySelector(".tamanho");
        this.animacao = null;
        this.ehQuadrado = true;

        if (this.canvas.getContext) this.contexto = this.canvas.getContext("2d");

        this.tamanho = tamanho;

        const rect = this.canvas.parentNode.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;

        this.position = {
            x: parseInt(this.informacaoEmX.textContent),
            y: parseInt(this.informacaoEmY.textContent),
        };
        this.informacaoTamanho.textContent = `${this.canvas.width}x${this.canvas.height}`;
    }
    limpaDesenho() {
        this.contexto.save();
        this.contexto.setTransform(1, 0, 0, 1, 0, 0);
        this.contexto.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.contexto.restore()
    }
    desenha() {
        const { x, y } = this.position;
        if (this.ehQuadrado)
            this.contexto.fillRect(x, y, this.tamanho, this.tamanho);
        else this.transformaEmEstrela();
    }
    cor(cor) {
        this.limpaDesenho();
        this.contexto.fillStyle = cor;
        this.desenha();
    }

    atualizaInformacoes({ x, y }) {
        this.informacaoEmX.textContent = x;
        this.informacaoEmY.textContent = y;
    }

    mudaFPS(fps) {
        this.informacaoFPS += fps;
    }

    movimentaParaDireita() {
        clearInterval(this.animacao);
        const fps = parseInt(document.querySelector(".sliderFPS").value)
        const sliderEmX = document.querySelector(".sliderX");
        let counter = 0;
        this.animacao = setInterval(() => {
            const currentInfo = this.canvas.getBoundingClientRect();
            if (counter <= Math.round(currentInfo.width / 2)) {
                this.limpaDesenho();
                this.position.x += 1;
                sliderEmX.value = this.position.x;
                this.atualizaInformacoes(this.position)
                this.desenha();
                counter++;
            } else {
                clearInterval(this.animacao);
                this.transformaEmEstrela();
            }
        }, Math.round(1000 / fps));
    }

    resetaPosicaoInicial() {
        clearInterval(this.animacao);
        this.limpaDesenho();
    }

    criarEstrela(cx, cy, spikes, outerRadius, innerRadius) {
        let rot = (Math.PI / 2) * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;

        this.contexto.strokeSyle = "#000";
        this.contexto.beginPath();
        this.contexto.moveTo(cx, cy - outerRadius);

        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            this.contexto.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            this.contexto.lineTo(x, y);
            rot += step;
        }
        this.contexto.lineTo(cx, cy - outerRadius);
        this.contexto.closePath();
        this.limpaDesenho();
        this.contexto.lineWidth = 5;
        this.contexto.strokeStyle = "blue";
        this.contexto.stroke();
        this.contexto.fillStyle = "skyblue";
        this.contexto.fill();
        this.ehQuadrado = false;
    }
    transformaEmEstrela() {
        const { x, y } = this.position;
        this.criarEstrela(x, y, 5, 30, this.tamanho);
    }
}
document.querySelector(".autor").textContent = 'Albérico Dias Barreto Filho'