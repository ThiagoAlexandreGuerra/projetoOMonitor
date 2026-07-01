
export default function renderDiff(diffs = []) {

   
    if (!Array.isArray(diffs)) {
        throw new Error(
            "Diffs must be an array."
        );
    }
    
    for (const diff of diffs) {

        if (!diff) {
            continue;
        }

        const element =
            document.getElementById(
                diff.nodeId
            );

        switch (diff.type) {

            case "VALUE_CHANGED":
                renderValueChanged(
                    element,
                    diff
                );
                break;

            case "ADDED":
                renderAdded(
                    element,
                    diff
                );
                break;

            case "REMOVED":
                renderRemoved(
                    element,
                    diff
                );
                break;

            case "TYPE_CHANGED":
                renderTypeChanged(
                    element,
                    diff
                );
                break;
        }
    }
}

function renderValueChanged(
    element,
    diff
) {
    
    if (!element) {
        return;
    }

    switch (diff.category) {

        case "styles":

            element.style[
                diff.property
            ] = diff.newValue;

            break;

        case "property":

            if (
                diff.property === "textContent"
            ) {

                element.textContent =
                    diff.newValue ?? "";

                return;
            }

            element[
                diff.property
            ] = diff.newValue;

            break;
        case "generic":

    if (diff.property === "parent") {

        renderChildrenChanged(
            element,
            diff,
            diff.newValue
        );

        return;
    }    
    }
}
function renderChildrenChanged(
    parentElement,
    diff,
    newNode
) {

   
    let newTreeElements = findChildUpdate(newNode.children , diff.nodeId)
    
    let childElement = null;
    newTreeElements.forEach((vnode)=>{
       childElement= createElementFromVNode(vnode);
       parentElement.appendChild(childElement);
    })
}

function findChildUpdate(node , parentId , findParent= false , children = []){
    
    
    if(Array.isArray(node)){
        node.forEach(child => {
            
            if((child.id == parentId)){
                findParent = true;
                return findChildUpdate(child.children, parentId , true , children);
            } 
            
            if(findParent){

                let newChild = document.getElementById(`${child.id}`);
               
                if(!newChild){
                   
                    children.push(child);
                    
                }
            }

            

        });

        if(children){return children;}
        
    }

}
function createElementFromVNode(
    vnode
) {

    const element =
        document.createElement(
            vnode.tag
        );

    // id
    if (vnode.id) {
        element.id = vnode.id;
    }

    // classes
    if (Array.isArray(vnode.class)) {

        element.className =
            vnode.class.join(" ");
    }

    // texto
    if (vnode.text) {

        element.textContent =
            vnode.text;
    }

    // html
    if (vnode.html) {

        element.innerHTML =
            vnode.html;
    }

    // propriedades
    if (vnode.property) {

        Object.assign(
            element,
            vnode.property
        );
    }

    // estilos
    if (vnode.styles) {

        Object.assign(
            element.style,
            vnode.styles
        );
    }

    // eventos
    if (
        Array.isArray(
            vnode.addEventListenerFunctions
        )
    ) {

        for (
            const listener
            of vnode.addEventListenerFunctions
        ) {

            element.addEventListener(
                listener.type,
                listener.function
            );
        }
    }

    // filhos recursivos
    if (
        Array.isArray(
            vnode.children
        )
    ) {

        for (
            const childNode
            of vnode.children
        ) {

            element.appendChild(
                createElementFromVNode(
                    childNode
                )
            );
        }
    }

    return element;
}
function renderAdded(
    element,
    diff
) {

    if (!element) {
        return;
    }

    if (
        diff.category === "event"
    ) {

        if (
            typeof diff.newValue ===
            "function"
        ) {

            element.addEventListener(
                "click",
                diff.newValue
            );
        }
    }
}

function renderRemoved(
    element,
    diff
) {

    if (!element) {
        return;
    }

    if (
        diff.category === "event"
    ) {

        if (
            typeof diff.oldValue ===
            "function"
        ) {

            element.removeEventListener(
                "click",
                diff.oldValue
            );
        }
    }
}

function renderTypeChanged(
    element,
    diff
) {

    if (!element) {
        return;
    }

    switch (diff.category) {

        case "styles":

            element.style[
                diff.property
            ] = diff.newValue;

            break;

        case "property":

            element[
                diff.property
            ] = diff.newValue;

            break;
    }
}