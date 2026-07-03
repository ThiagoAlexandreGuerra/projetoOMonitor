export default function loadStyleSheet(url) {

    return new Promise((resolve, reject) => {

        const link = document.createElement("link");

        link.rel = "stylesheet";
        link.href = url;

        link.onload = () => resolve(link);
        link.onerror = () => reject(new Error(`Could not load ${url}`));

        document.head.appendChild(link);
    });
}