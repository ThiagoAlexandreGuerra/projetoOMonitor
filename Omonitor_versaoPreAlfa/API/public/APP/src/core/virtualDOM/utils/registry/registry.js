export const NODE_INDEX = new Map();

/*
NODE_INDEX = {

    "BOX-001" : {

        node:  objeto,
        parent: objetoPai,
        index: 0
    },

    "BOX-002" : {

        node: objeto,
        parent: objetoPai,
        index: 1
    }
}
*/

export function registerNode(
    node,
    parent = null,
    index = -1
) {

    if (!node) {
        return;
    }

    if (node.id) {

        NODE_INDEX.set(
            node.id,
            {
                node,
                parent,
                index
            }
        );
    }

    if (
        Array.isArray(node.children)
    ) {

        node.children.forEach(
            (child, childIndex) => {

                registerNode(
                    child,
                    node,
                    childIndex
                );
            }
        );
    }
}
export function unregisterNode(node) {

    if (!node) {
        return;
    }

    if (node.id) {

        NODE_INDEX.delete(
            node.id
        );
    }

    if (
        Array.isArray(node.children)
    ) {

        for (const child of node.children) {

            unregisterNode(child);
        }
    }
}