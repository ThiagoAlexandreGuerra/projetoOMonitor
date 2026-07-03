/**
 * Converts any CSS color to hexadecimal format.
 *
 * @param {string} color
 * @returns {string}
 */
export default function colorToHex(color) {

    const tempElement = document.createElement("div");

    tempElement.style.color = color;

    document.body.appendChild(tempElement);

    const computedColor =
        window.getComputedStyle(tempElement)
            .color;

    document.body.removeChild(tempElement);

    const rgb = computedColor.match(/\d+/g);

    if (!rgb || rgb.length < 3) {

        throw new TypeError(
            `Invalid color: ${color}`
        );
    }

    const [r, g, b] = rgb.map(Number);

    return (
        "#" +
        r.toString(16).padStart(2, "0") +
        g.toString(16).padStart(2, "0") +
        b.toString(16).padStart(2, "0")
    );
}