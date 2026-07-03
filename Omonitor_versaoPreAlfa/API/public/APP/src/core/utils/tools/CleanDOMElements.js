import { virtualDomRemoveNodeById } from "../../virtualDOM/main/virtualDom.js";

export default function cleanDOMElements(...classesElementoDom) {

    if (!Array.isArray(classesElementoDom) || classesElementoDom.length === 0) {
        throw new Error(
            "Informe ao menos uma classe."
        );
    } 

    for (const classe of classesElementoDom) {

        if (
            typeof classe !== "string" ||
            classe.trim() === ""
        ) {
            console.warn(
                "Classe inválida ignorada:",
                classe
            );
            continue;
        }

        let elementos;

        try {
            elementos = Array.from(
                document.getElementsByClassName(classe)
                
            );
           
        }
        catch (error) {
            console.error(
                `Erro ao localizar elementos da classe '${classe}'`,
                error
            );
            continue;
        }

        if (elementos.length === 0) {
            continue;
        }

        for (const elemento of elementos) {

            try {

                if (elemento?.id) {
                    virtualDomRemoveNodeById(elemento.id);
                }

            }
            catch (error) {

                console.error(
                    `Erro ao remover '${elemento.id}' do Virtual DOM`,
                    error
                );

            }

            try {

                if (elemento?.parentNode) {
                    elemento.remove();
                }

            }
            catch (error) {

                console.error(
                    `Erro ao remover '${elemento.id}' do DOM`,
                    error
                );

            }
        }
    }
}