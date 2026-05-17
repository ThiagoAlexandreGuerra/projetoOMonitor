export default function renderizarElementos(tag, estilos = {}, propriedades = {}, append = false) {
    const elemento = document.createElement(tag);

    Object.assign(elemento.style, estilos);
    Object.assign(elemento, propriedades);

    if (append) {
        document.body.appendChild(elemento);
    }

    return elemento;
}