export default function limparDOM() {
    while (document.body.firstChild) {
        document.body.removeChild(
            document.body.firstChild
        );
    }
}