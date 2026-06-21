export default function convertElementToObject(element) {

        if (!(element instanceof HTMLElement)) return null;

        return {
            tag: element.tagName.toLowerCase(),

            id: element.id || null,

            classes: [...element.classList],

            texto: element.innerText || "",

            html: element.innerHTML || "",

            atributos: [...element.attributes].reduce((obj, attr) => {

                obj[attr.name] = attr.value;
                return obj;

            }, {}),

            estilos: {

                width: element.style.width,
                height: element.style.height,
                display: element.style.display,
                position: element.style.position,
                backgroundColor: element.style.backgroundColor

            },

            filhos: [...element.children].map(filho =>
                elementToObject(filho)
            )
        };
}