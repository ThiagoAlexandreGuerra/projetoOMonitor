
export default function removeNodeById(root, id) {

    if (!root || typeof root !== "object") {
        return false;
    }

    function remove(children) {

        if (!Array.isArray(children)) {
            return false;
        }

        for (let i = 0; i < children.length; i++) {

            const node = children[i];

            if (node.id === id) {

                children.splice(i, 1);

                // Garante que realmente foi removido
                return !children.some(child => child.id === id);
            }

            if (remove(node.children)) {
                return true;
            }
        }

        return false;
    }

    // Caso a raiz seja o elemento procurado
    if (root.id === id) {
        throw new Error("Não é possível remover o nó raiz.");
    }

    return remove(root.children);
}