export default function createElement(node) {

    
    const element =
        document.createElement(
            node.tag
        );

    // texto
    if (node.text) {

        element.textContent =
            node.text;
    }

    // html
    if (node.html) {

        element.innerHTML =
            node.html;
    }

    // classes
    if (Array.isArray(node.class)) {

        element.className =
            node.class.join(" ");
    }

    // propriedades
    if (node.property) {

        Object.assign(
            element,
            node.property
        );
    }

    // estilos
    if (node.styles) {

        Object.assign(
            element.style,
            node.styles
        );
    }

    // eventos
    if (
        Array.isArray(
            node.addEventListenerFunctions
        )
    ) {

        node.addEventListenerFunctions.forEach(
            listener => {

                element.addEventListener(
                    listener.type,
                    listener.function
                );

            }
        );
    }

    // filhos
    if (
        Array.isArray(
            node.children
        )
    ) {

        node.children.forEach(
            child => {

                element.appendChild(
                    createElement(child)
                );

            }
        );
    }

    
    return element;
}
