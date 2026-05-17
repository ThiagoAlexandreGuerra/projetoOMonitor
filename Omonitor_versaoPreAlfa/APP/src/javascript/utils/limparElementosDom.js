export default function limparElementosDom(
    ...classesElementoDom
) {

    if (classesElementoDom.length === 0) {
        throw new Error(
            "Informe ao menos uma classe."
        );
    }

    classesElementoDom.forEach(classe => {

        document
            .querySelectorAll(`.${classe}`)
            .forEach(el => el.remove());
    });
}