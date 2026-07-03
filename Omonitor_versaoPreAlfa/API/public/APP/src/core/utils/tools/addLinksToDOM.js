export function addLinksToDOM(htmlString) {

    if (typeof htmlString !== "string") {
        throw new TypeError("Expected a string.");
    }

    const template = document.createElement("template");
    template.innerHTML = htmlString.trim();

    const links =
        template.content.querySelectorAll("link");

    links.forEach(link => {

        const href =
            link.getAttribute("href");

        if (!href) return;

        const alreadyExists =
            document.head.querySelector(
                `link[href="${CSS.escape(href)}"]`
            );

        if (!alreadyExists) {
            document.head.appendChild(
                link.cloneNode(true)
            );
        }

    });
}