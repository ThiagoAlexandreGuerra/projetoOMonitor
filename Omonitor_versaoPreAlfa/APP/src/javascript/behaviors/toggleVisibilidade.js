import aparecer from "./aparecer.js";
import desaparecer from "./desaparecer.js";

export default function toggleVisibilidade(elemento) {
    if (getComputedStyle(elemento).display === "none") {
        aparecer(elemento);
    } else {
        desaparecer(elemento);
    }
}