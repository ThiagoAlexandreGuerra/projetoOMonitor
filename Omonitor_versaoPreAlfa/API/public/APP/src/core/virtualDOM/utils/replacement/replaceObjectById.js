export default function replaceElementById(
    tree,
    id,
    newObject
) {

    if (
        !tree ||
        !Array.isArray(tree.children)
    ) {
        return false;
    }

    for (
        let i = 0;
        i < tree.children.length;
        i++
    ) {

        const child =
            tree.children[i];

        if (child.id === id) {

            tree.children[i] =
                newObject;

            return true;
        }

        const found =
            replaceElementById(
                child,
                id,
                newObject
            );

        if (found) {
            return true;
        }
    }

    return false;
}