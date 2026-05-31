export default function responsividade(
    componente,
    eixoX = true,
    eixoY = true,
    width = true,
    height = true,
    fatorUPEixoX = 1,
    fatorUPEixoY = 1,
    fatorUPWidth = 1,
    fatorUPHeight = 1
) {

    const larguraBase = window.innerWidth;
    const alturaBase = window.innerHeight;

    const widthOriginal = parseFloat(componente.getWidth);
    const heightOriginal = parseFloat(componente.getHeight);
    const leftOriginal = parseFloat(componente.getLeft);
    const topOriginal = parseFloat(componente.getTop);

    const atualizar = () => {

        const escalaX = window.innerWidth / larguraBase;
        const escalaY = window.innerHeight / alturaBase;

        const fuw = escalaX > 1 ? fatorUPWidth : 1;
        const fuh = escalaY > 1 ? fatorUPHeight : 1;
        const fux = escalaX > 1 ? fatorUPEixoX : 1;
        const fuy = escalaY > 1 ? fatorUPEixoY : 1;

        if (width)
            componente.atribuirWidth =
                `${widthOriginal * escalaX * fuw}px`;

        if (height)
            componente.atribuirHeight =
                `${heightOriginal * escalaY * fuh}px`;

        if (eixoX)
            componente.atribuirLeft =
                `${leftOriginal * escalaX * fux}px`;

        if (eixoY)
            componente.atribuirTop =
                `${topOriginal * escalaY * fuy}px`;
    };

    atualizar();

    window.addEventListener("resize", atualizar);
}