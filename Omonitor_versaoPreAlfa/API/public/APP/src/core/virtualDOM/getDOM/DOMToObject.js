export default function DOMToObject(node) {

    
    if (node.nodeType === Node.TEXT_NODE) {

        const texto = node.textContent.trim();

        if (!texto) return null;

        return {
            type: "TEXT",
            value: texto
        };
    }

    if (node.nodeType === Node.COMMENT_NODE) {

        return {
            type: "COMMENT",
            value: node.textContent
        };
    }

    if (node.nodeType === Node.ELEMENT_NODE) {

        return {

            tag: node.tagName.toLowerCase(),
 
            property: [...node.attributes].reduce((obj, attr) => {

                obj[attr.name] = attr.value;
                return obj;

            }, {}),

            children: [...node.childNodes]
                .map(child => DOMToObject(child))
                .filter(Boolean)
        };
    }

    return null;
}