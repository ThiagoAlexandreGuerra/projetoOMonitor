import Navigation from "../../navigation/domElementNavigator/Navigation.js";
import { virtualDomRemoveNodeById } from "../../virtualDOM/main/virtualDom.js";

export default function cleanDOMElements(
    ...classesElementoDom
) {

    if (classesElementoDom.length === 0) {
        throw new Error(
            "Informe ao menos uma classe."
        );
    }

    classesElementoDom.forEach(classe => {

        if(document.querySelector(`.${classe}`)){
            virtualDomRemoveNodeById(document.querySelectorAll(`.${classe}`)[0].id)
            document
                .querySelectorAll(`.${classe}`)
                .forEach(el => el.remove());
        }
    });
}
