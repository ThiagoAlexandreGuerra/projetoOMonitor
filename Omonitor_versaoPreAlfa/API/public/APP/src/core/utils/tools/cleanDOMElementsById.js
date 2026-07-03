export default function cleanDOMElementsById(...idsElementoDom) {

    if (!Array.isArray(idsElementoDom) || idsElementoDom.length === 0) {
        throw new Error(
            "Informe ao menos uma classe."
        );
    } 

    for (const ids of idsElementoDom) {

        if (
            typeof ids !== "string" ||
            ids.trim() === ""
        ) {
            console.warn(
                "id inválida ignorada:",
                ids
            );
            continue;
        }
    
        try{
            document.getElementById(ids).remove();
        }catch(e){
            console.warn(
                `this id:${ids} is not found!!`,
                `error:${e}`
            );
        }
    }   

}