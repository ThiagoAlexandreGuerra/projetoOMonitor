/**
 * Adjusts the intensity of a hexadecimal color.
 *
 * @param {string} hexColor - Color in hexadecimal format (#RRGGBB).
 * @param {"lighten"|"darken"} operation - Desired operation.
 * @param {number} intensity - Value between 0 and 1.
 * @returns {string} Adjusted hexadecimal color.
 */

import colorToHex from "./colorToHex.js";

export default function adjustColorIntensity(
    hexColor,
    operation = "lighten",
    intensity = 0.2
) {

    if (!/^#([0-9A-F]{6})$/i.test(hexColor)) {
        hexColor = colorToHex(hexColor);
    }

    if (
        operation !== "lighten" &&
        operation !== "darken"
    ) {
        throw new TypeError(
            "operation must be 'lighten' or 'darken'."
        );
    }

    if (
        typeof intensity !== "number" ||
        intensity < 0 ||
        intensity > 1
    ) {
        throw new TypeError(
            "intensity must be a number between 0 and 1."
        );
    }

    let r = parseInt(hexColor.slice(1, 3), 16);
    let g = parseInt(hexColor.slice(3, 5), 16);
    let b = parseInt(hexColor.slice(5, 7), 16);

    if (operation === "lighten") {

        r += (255 - r) * intensity;
        g += (255 - g) * intensity;
        b += (255 - b) * intensity;

    } else {

        r *= (1 - intensity);
        g *= (1 - intensity);
        b *= (1 - intensity);
    }

    r = Math.round(Math.min(255, Math.max(0, r)));
    g = Math.round(Math.min(255, Math.max(0, g)));
    b = Math.round(Math.min(255, Math.max(0, b)));

    return (
        "#" +
        r.toString(16).padStart(2, "0") +
        g.toString(16).padStart(2, "0") +
        b.toString(16).padStart(2, "0")
    );
}