import DOMToObject          from "../getDOM/DOMToObject.js";
import findNode             from "../utils/search/findNode.js";
import thisAppendChild      from "../utils/objectUtils/appendChildToThis.js";
import diffObjects          from "../utils/objectUtils/diffObjects.js";
import findElementById      from "../utils/search/findById.js";
import renderTreeObjects    from "../../render/renders/renderTreeObject.js";
import render               from "../../render/main/render.js";
import removeFunctions      from "../functionHandlers/removeFunctionReferences.js";
import removeNodeById       from "../utils/objectUtils/removeNodeById.js";
import { registerNode , unregisterNode , NODE_INDEX } from "../utils/registry/registry.js";

let PAST = null;
let NOW = null;

let INITIALIZED = false;

export function virtualDom(
    child,
    parentId = ""
) {
   
    if (!child) return;

    if (parentId === "") {

        parentDontExist(child);

    } else {

        parentExist(child, parentId);
    }
}

export function updateVirtualDom(
    newObject
) {
   
    if (!newObject) {

        throw new Error(
            "Invalid object."
        );
    }

    const id =
        newObject.id;
 
    const record =
        NODE_INDEX.get(id);
    
    
    if (!record) {

        return;
    }

    PAST =
        structuredClone(removeFunctions(NOW));

    const nodeObj =
    findElementById(
        NOW,
        newObject.id
    );

    if(newObject.value) {
        nodeObj.styles[newObject.typeProp] = newObject.value;    
        newObject = nodeObj;
    }
    const {
        parent,
        index
    } = record;

    if (!parent) {

        unregisterNode(NOW);
       
        NOW = newObject;

        registerNode(NOW);

    } else {

        unregisterNode(
            parent.children[index]
        );

        newObject.parent =
            parent;

           
        parent.children[index] =
            newObject;

        registerNode(
            newObject,
            parent,
            index
        );

    }
   
    const DIFF =
        diffObjects(
            PAST,
            NOW
        );

    render(DIFF);
    
    return DIFF;
}

function parentExist(child, parentId) {

    if (!INITIALIZED) {

        INITIALIZED = true;

        NOW =
            DOMToObject(
                document.documentElement
            );
    }

    PAST =
        structuredClone(removeFunctions(NOW));

    const parent =
        findElementById(
            NOW,
            parentId
        );
 
    if (!parent) {

        throw new Error(
            `Parent with id "${parentId}" not found.`
        );
    }

    thisAppendChild(
        parent,
        child
    );

    registerNode(NOW);
   
    const DIFF =
        diffObjects(
            PAST,
            NOW
        );

    render(DIFF);
    
    return DIFF;
}


function parentDontExist(child) {

    
    if (!INITIALIZED) {

        INITIALIZED = true;

        const INITIALDOM =
            DOMToObject(
                document.documentElement
            );
    
        NOW =
            structuredClone(
                INITIALDOM
            );
     
    }

    PAST =
        structuredClone(removeFunctions(NOW));

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

    thisAppendChild(
        body,
        child
    );

    registerNode(NOW);

    const DIFF =
        diffObjects(
            PAST, 
            NOW
        );
 
    render(NOW);

    return DIFF;
}

export function virtualDomRemoveNodeById(targetId){

    removeNodeById(NOW , targetId)
}