export default function removeNodeById(tree, targetId){

    
    if (!tree || !tree.children) {
        return tree;
    }

    tree.children = tree.children.filter(
        child => child.id !== targetId
    );

    tree.children.forEach(child => {
        removeNodeById(child, targetId);
    });

    return tree;
}