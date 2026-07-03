export default function findByTag(tree, tag){

    if(!tree) return null;

    // Caso seja array
    if(Array.isArray(tree)){

        for(const node of tree){

            const found = findByTag(node, tag);

            if(found) return found;
        }

        return null;
    }

    // Enco ntrou
    if(tree.tag === tag){
        return tree;
    }

    // Busca recursiva nos filhos
    if(Array.isArray(tree.children)){

        for(const child of tree.children){

            const found = findByTag(child, tag);

            if(found) return found;
        }
    }

    return null;
}