export default function findNode(tree, predicate){

    if(!tree) return null;

    if(Array.isArray(tree)){

        for(const node of tree){

            const found = findNode(node, predicate);

            if(found) return found;
        }

        return null;
    }

    if(predicate(tree)){
        return tree;
    }
 
    if(Array.isArray(tree.children)){

        for(const child of tree.children){

            const found = findNode(child, predicate);

            if(found) return found;
        }
    }

    return null;
}