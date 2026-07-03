export default function autoDisplay(element) {

    if (!element || !element.styles) return;

    const width  = parseFloat(element.styles.width);
    const height = parseFloat(element.styles.height);

    if (isNaN(width) || isNaN(height)) {

        console.warn(
            "Invalid width or height:",
            element
        );

        return;
    }

    if (width <= 0 || height <= 0) {

        console.warn(
            "Element has invalid dimensions:",
            element
        );

        return;
    }

    const ratio = width / height;

    Object.assign(element.styles, {
        display: "flex",
        wordWrap: "break-word",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "50px 50px",
        margin: "10px"
    });

    if (ratio > 1.1) {

        Object.assign(element.styles, {
            flexDirection: "column",
            color: "#dadada",
            justifyContent: "center",
            alignItems: "flex-start",
            textAlign: "left",
            overflow: "scroll",
            overflowX: "hidden",
            padding: "10px"
        });
 
    } else {

        Object.assign(element.styles, {
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
        });

    }
}