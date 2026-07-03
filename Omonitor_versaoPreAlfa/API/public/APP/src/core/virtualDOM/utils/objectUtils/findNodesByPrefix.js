export default function findNodesByPrefix(root, prefixes) {

    if (!Array.isArray(prefixes)) {
        prefixes = [prefixes];
    }

    const result = [];

    function walk(node) {

        if (!node || typeof node !== "object") {
            return;
        }

        if (
            typeof node.id === "string" &&
            prefixes.some(prefix => node.id.startsWith(prefix))
        ) {
            result.push(node);
        }

        if (Array.isArray(node.children)) {
            for (const child of node.children) {
                walk(child);
            }
        }
    }

    walk(root);

    return result;
}