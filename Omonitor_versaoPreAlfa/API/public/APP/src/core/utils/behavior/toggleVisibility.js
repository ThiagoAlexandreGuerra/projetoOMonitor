import elementOn from "./elementOn.js";
import elementOff from "./elementOff.js";

export default function toggleVisibility(elemento) {
    if (getComputedStyle(elemento).display === "none") {
        elementOn(elemento);
    } else {
        elementOff(elemento);
    }
}