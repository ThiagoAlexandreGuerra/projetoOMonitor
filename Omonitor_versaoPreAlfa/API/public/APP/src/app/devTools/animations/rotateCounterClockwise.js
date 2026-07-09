export default function rotateCounterClockwise(
    element,
    duration = 1000
) {
    element.animate(
        [
            { transform: "rotate(0deg)" },
            { transform: "rotate(-360deg)" }
        ],
        {
            duration,
            iterations: 1,
            easing: "linear",
            fill: "forwards"
        }
    );
}
