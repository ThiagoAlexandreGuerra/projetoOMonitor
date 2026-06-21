export default function renderTreeObject(tree) {

    
    const bodyNode = findBody(tree);

    if (!bodyNode) {

        console.warn(
            "Body element not found in virtual tree."
        );

        return null;
    }

    const bodyContent =
        renderTreeObjectsAux(bodyNode);

    document.body.replaceChildren(
        ...bodyContent.childNodes
    );

    return bodyContent;
}

function findBody(tree) {

    if (!tree) {
        return null;
    }

    if (tree.tag === "body") {
        return tree;
    }

    if (Array.isArray(tree.children)) {

        for (const child of tree.children) {

            const result =
                findBody(child);

            if (result) {
                return result;
            }
        }
    }

    return null;
}

function renderTreeObjectsAux(tree) {

    if (!tree) {
        return null;
    }

    if (tree.type === "COMMENT") {

        return document.createComment(
            tree.value || ""
        );
    }

    const element =
        document.createElement(
            tree.tag || "div"
        );

    if (tree.property) {

        for (const key in tree.property) {

            const value =
                tree.property[key];

            if (
                value !== undefined &&
                value !== null
            ) {

                element[key] = value;
            }
        }
    }

    if (
        Array.isArray(tree.class) &&
        tree.class.length > 0
    ) {

        element.className =
            tree.class.join(" ");
    }

    if (tree.styles) {

        Object.assign(
            element.style,
            tree.styles
        );
    }

    if (tree.text) {

        element.textContent =
            tree.text;
    }

    if (tree.html) {

        element.innerHTML =
            tree.html;
    }

    if (
        Array.isArray(
            tree.children
        )
    ) {

        tree.children.forEach(child => {

            const childElement =
                renderTreeObjectsAux(
                    child
                );

            if (childElement) {

                element.appendChild(
                    childElement
                );
            }
        });
    }

    return element;
}