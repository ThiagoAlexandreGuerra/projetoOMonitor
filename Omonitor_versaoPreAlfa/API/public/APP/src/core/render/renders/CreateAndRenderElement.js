export default function render(
    tag,
    estilos = {},
    propriedades = {},
    container = null
) {

    
    const elemento = document.createElement(tag);
    
    Object.assign(elemento.style, estilos);
    Object.assign(elemento, propriedades);

    enqueue(elemento, container);

    return elemento;
}

const fila = [];

let scheduled = false;

function enqueue(elemento, container){

    fila.push({
        elemento,
        container
    });

    if(!scheduled){

        scheduled = true;

        queueMicrotask(commit);
    }
}

function commit(){

    const fragments = new Map();

    fila.forEach(({ elemento, container }) => {

        const destino = container || document.body;

        if(!fragments.has(destino)){

            fragments.set(
                destino,
                document.createDocumentFragment()
            );
        }

        fragments
            .get(destino)
            .appendChild(elemento);
    });

    fragments.forEach((fragment, destino) => {

        destino.appendChild(fragment);
    });

    fila.length = 0;

    scheduled = false;
}