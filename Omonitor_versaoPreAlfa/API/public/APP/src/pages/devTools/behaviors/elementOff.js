export default function elementOff(elemento) {
    if (elemento.style.display !== "none") {
        elemento.dataset.displayOriginal =
            getComputedStyle(elemento).display;

        elemento.style.display = "none";
    }
}