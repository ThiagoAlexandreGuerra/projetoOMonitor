export default function aparecer(elemento) {
    if (elemento.style.display === "none") {
        elemento.style.display =
            elemento.dataset.displayOriginal || "block";
    }
}