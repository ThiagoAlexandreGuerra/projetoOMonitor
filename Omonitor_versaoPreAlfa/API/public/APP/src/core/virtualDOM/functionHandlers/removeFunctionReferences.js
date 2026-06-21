export default function removeFunctionReferences(tree, visited = new WeakSet()) {

    if (tree === null || tree === undefined) {
        return tree;
    }

    if (typeof tree === "function") {
        return undefined;
    }

    if (typeof tree !== "object") {
        return tree;
    }

    if (visited.has(tree)) {
        return undefined;
    }

    visited.add(tree);

    if (Array.isArray(tree)) {

        return tree
            .map(item => removeFunctionReferences(item, visited))
            .filter(item => item !== undefined);
    }

    const newObject = {};

    for (const key in tree) {

        if (!Object.hasOwn(tree, key)) {
            continue;
        }

        if (typeof tree[key] === "function") {
            continue;
        }

        const value = removeFunctionReferences(tree[key], visited);

        if (value !== undefined) {
            newObject[key] = value;
        }
    }

    return newObject;
}