import DOMToObject from "../getDOM/DOMToObject.js";
import findNode from "../utils/search/findNode.js";
import thisAppendChild from "../utils/objectUtils/appendChildToThis.js";
import diffObjects from "../utils/objectUtils/diffObjects.js";
import findElementById from "../utils/search/findById.js";
import render from "../../render/main/render.js";
import removeFunctions from "../functionHandlers/removeFunctionReferences.js";
import removeNodeById from "../utils/objectUtils/removeNodeById.js";
import precisionDiff from "../utils/objectUtils/precisionDiff.js";
import replaceObjectById from "../utils/replacement/replaceObjectById.js";
import findNodesByPrefix from "../utils/objectUtils/findNodesByPrefix.js";
import {
    registerNode,
    unregisterNode,
    NODE_INDEX
}
from "../utils/registry/registry.js";

let NOW = null;
let INITIALIZED = false;

function initialize() {

    if (INITIALIZED) {
        return;
    }

    INITIALIZED = true;
 
    NOW = structuredClone(
        DOMToObject(
            document.documentElement
        )
    );
}

function snapshot() {

    return structuredClone(
        removeFunctions(NOW)
    );
}

function commit(past) {

    const diff =
        diffObjects(
            past,
            NOW
        );
    
    render(diff);

    return diff;
}

function commit2(past){

    const diff = precisionDiff(past , NOW);
    render(diff);
    return diff;
}
function getBody() {

    const body =
        findNode(
            NOW,
            node => node.tag === "body"
        );

    if (!body) {
        throw new Error(
            "Body element not found."
        );
    }

    return body;
}

export function virtualDom(
    child,
    remove = false
) {
  
    if (!child) {
        return;
    }
    if(remove){
        removeNode(child)
        return;
    }else if(!child.id.includes(`VTB`)){
        updateNode(child)
        return;
    }else{
        
        if(findNodesByPrefix(NOW, ['VTB'])[0]){
            let NodeToDelete = findNodesByPrefix(NOW, ['VTB']);
            NodeToDelete.forEach((node)=>{
                virtualDomRemoveNodeById(node.id , false);
            })
        }
        initialize();
        
        const past = snapshot();
        
        const parent =
        child.parentId
        ? findElementById(
                NOW,
                child.parentId
              )
            : getBody();
        
    if (!parent) {
        throw new Error(
            `Parent with id "${child.parentId}" not found.`
        );
    }

    thisAppendChild(
        parent,
        child
    );

    registerNode(NOW);
    
    return commit(past);
    }
}

function updateNode(node){

    const past = snapshot();

    parent = findElementById(NOW, node.parentId);

    replaceObjectById(NOW, node.id , node);

    const diff = precisionDiff(past,NOW);
    render(diff)
}

function removeNode(node){

    virtualDomRemoveNodeById(node.id)

}

export function updateVirtualDom(
    update
) {
    
    if (!update) {
        throw new Error(
            "Invalid object."
        );
    }

    initialize();
    
    const record =
        NODE_INDEX.get(update.id);

    if (!record) {
        return null;
    }

    const past = snapshot();

    const node =
        findElementById(
            NOW,
            update.id
        );

    if (!node) {
        return null;
    }

    node.styles[
        update.typeProp
    ] = update.value;

    const {
        parent,
        index
    } = record;

    if (!parent) {

        unregisterNode(NOW);

        NOW = node;

        registerNode(NOW);

    } else {

        unregisterNode(
            parent.children[index]
        );

        node.parent =
            parent;

        parent.children[index] =
            node;

        registerNode(
            node,
            parent,
            index
        );
    }

    return queueMicrotask(()=>commit(past));
}

export function virtualDomRemoveNodeById(
    targetId , isComitResult = true
) {
    
    initialize();

    const past = snapshot();
    
    removeNodeById(
        NOW,
        targetId
    );

    registerNode(NOW);

    return !isComitResult || commit2(past);
}

