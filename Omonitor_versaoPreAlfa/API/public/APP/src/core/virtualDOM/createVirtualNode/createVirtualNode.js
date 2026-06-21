export default function createVirtualNode(
    tag,
    styles = {},
    property = {},
    children = [],
    functions = null,
    behaviorFunction = [],
    addEventListenerFunction = []
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

        haveParent: false,

        parent: null,

        elementFunctions: functions,

        behaviorFunctions: behaviorFunction,

        addEventListenerFunctions: addEventListenerFunction,
    };
}