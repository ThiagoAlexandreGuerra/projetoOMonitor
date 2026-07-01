export default function createVirtualNode(
    tag,
    styles = {},
    property = {},
    children = [],
    functions = null,
    behaviorFunction = [],
    addEventListenerFunction = [],
    parentId_=""
) {

    
    return { 

        tag: tag || "div",

        id:
            property.id || null,

        text:
            property.textContent || "",

        html:
            property.innerHTML || "",

        class:
            property.className
                ? property.className.split(" ")
                : [],

        property: {

            ...property
        },

        styles: {

            ...styles
        },
        
        children:
            Array.isArray(children)
                ? children
                : [children],

        haveParent: parentId_?true:false,

        parentId: parentId_,

        elementFunctions: functions,

        behaviorFunctions: behaviorFunction,

        addEventListenerFunctions: addEventListenerFunction,
    };
}