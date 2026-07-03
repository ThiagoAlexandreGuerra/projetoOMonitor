export default function cleanDOM() {
    while (document.body.firstChild) {
        document.body.removeChild(
            document.body.firstChild
        );
    }
}