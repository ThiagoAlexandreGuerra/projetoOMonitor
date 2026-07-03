export default function slideHorizontalV(elemento=null, posicaoFinal="50px", duracao = 1000) {
    
    
    const posicaoInicial = elemento.offsetLeft;
    const distancia = posicaoFinal - posicaoInicial;
    const inicio = performance.now();

    function animar(tempoAtual) {
        const tempoDecorrido = tempoAtual - inicio;
        const progresso = Math.min(tempoDecorrido / duracao, 1);

        const novaPosicao = posicaoInicial + (distancia * progresso);

        elemento.style.left = `${novaPosicao}px`;

        if (progresso < 1) {
            requestAnimationFrame(animar);
        }
    }

    requestAnimationFrame(animar);
}