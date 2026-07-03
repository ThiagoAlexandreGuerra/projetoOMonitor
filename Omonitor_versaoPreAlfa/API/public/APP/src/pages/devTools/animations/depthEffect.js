export default function depthEffect(
    element,
    duration = 1000
) {

    element.style.transformStyle = "preserve-3d";

    element.animate(
        [
            {
                transform: "perspective(1000px) translateZ(-300px)",
                opacity: 0.4
            },
            {
                transform: "perspective(1000px) translateZ(0)",
                opacity: 1
            }
        ],
        {
            duration,
            easing: "ease-out",
            fill: "forwards"
        }
    );
}