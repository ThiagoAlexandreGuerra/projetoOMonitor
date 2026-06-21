export const functionsMap = new Map();

export default function createFunctionsMap(tree) {

    functionsMap.clear();

    traverseTree(tree);

    return functionsMap;
}

function traverseTree(node) {

    if (!node) {
        return;
    }

    if (
        (Array.isArray(node.elementFunctions) &&  node.elementFunctions.length > 0) ||
        (Array.isArray(node.behaviorFunctions) && node.behaviorFunctions.length > 0)
    ) {

        const key =
            node.id.split("-")[0];

        if (!functionsMap.has(key)) {

            functionsMap.set(
                key,
                []
            );
        }  

        functionsMap.get(key).push({
            id: node.id,
            class: node.class || [],
            functions: node.elementFunctions,
            behaviorFunctions : node.behaviorFunctions,
            addEventListenerFunctions: node.addEventListenerFunctions
        });
    }

    if (
        Array.isArray(node.children)
    ) {

        node.children.forEach(child => {

            traverseTree(child);

        });
    }

}