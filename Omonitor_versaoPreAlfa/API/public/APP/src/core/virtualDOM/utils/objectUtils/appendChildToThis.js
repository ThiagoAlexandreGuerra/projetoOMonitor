export default function appendChildToThis(parent, ...children){

    if(!Array.isArray(parent.children)){
        parent.children = [];
    }

    parent.children.push(...children);

    return parent;
}