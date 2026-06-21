export default function findElementById(
    tree,
    id
) {

    if (!tree || typeof tree !== "object") {
        return null;
    }

    
    if (tree.id === id) {
        return tree;
    }

    
    if (
        Array.isArray(tree.children)
    ) {

        for (const child of tree.children) {

            const result =
                findElementById(
                    child,
                    id
                );

            if (result) {
                return result;
            }
        }
    }

    return null;
}