export default function removeLinksFromDOM(htmlString) {

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

        document.head
            .querySelectorAll(
                `link[href="${CSS.escape(href)}"]`
            )
            .forEach(node => node.remove());

    });
}
