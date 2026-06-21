import { joinClickEventButtonFunctions }    from "../../componentsF/button/joinClickEventButtonFunctions.js";
import { joinStandardButtonFunctions }      from "../../componentsF/button/joinStandardButtonFunctions.js";
import {enableStandardComponentFunctions}   from "./enableStandardComponentFunctions.js";
import { functionsMap }                     from "../../../../virtualDOM/functionHandlers/createFunctionsMap.js";
import wear                                 from "../wrap.js";

export default function enableElementMethods() {


    functionsMap.forEach((elements, prefix) => {

        elements.forEach(elementData => {

            const domElement =
                document.getElementById(
                    elementData.id
                );

            if (!domElement) {

                console.warn(
                    `Element "${elementData.id}" was not found in the DOM.`
                );

                return;
            }

            elementData.class.forEach(className => {

                attachBehavior(
                    domElement,
                    className,
                    elementData.functions,
                    elementData.behaviorFunctions,
                    elementData.addEventListenerFunctions
                );

            });

        });

    });

}

function attachBehavior(
    domElement,
    className,
    functions,
    behaviorFunctions,
    addEventListenerFunctions
) {

    switch (className) {

        case "ClickEventButton":

            wearClickEventButton(
                domElement,
                functions
            );

            break;

        case "StandartButton":

            wearStandartButton(
                domElement,
                behaviorFunctions
            );

            break;

        case "StandartComponent":

            wearStandartComponent(
                domElement,
                behaviorFunctions,
                addEventListenerFunctions
            );

            break;

        case "BoxWithCilldBoxes":

        case "SideBar":

        case "Span":

        case "ContentAll":

        case "LinkButton":

            console.warn(
                `"${className}" does not support attached functions.`
            );

            break;
    }
}
function wearClickEventButton(
    object,
    functions
) {

    wear(
        object,
        joinClickEventButtonFunctions
    );

    if (
        typeof object.enableFunctions ===
        "function"
    ) {

        object.enableFunctions(
            functions
        );
    }
}

function wearStandartButton(
    object,
    behaviorFunctions
) {

    wear(
        object,
        joinStandardButtonFunctions
    );

    if (
        typeof object.enableBehaviorFunctions ===
        "function"
    ) {

        object.enableBehaviorFunctions(
            behaviorFunctions
        );
    }
}

function wearStandartComponent(
    object,
    behaviorFunctions,
    addEventListenerFunctions
) {

    wear(
        object,
        enableStandardComponentFunctions
    );

     if (
        typeof object.enableBehaviorFunctions ===
        "function"
    ) {

        object.enableBehaviorFunctions(
            behaviorFunctions
        );

        object.enableAddEventListener(
            addEventListenerFunctions
        );
    }
    
}