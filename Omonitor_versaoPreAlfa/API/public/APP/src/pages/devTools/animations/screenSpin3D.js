export default function screenSpin3D(
    element,
    duration = 1500
) {

    element.style.transformStyle = "preserve-3d";

    element.animate(
        [
            {
                transform:
                    "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)"
            },
            {
                transform:
                    "perspective(1000px) rotateY(180deg) rotateX(30deg) translateZ(100px)"
            },
            {
                transform:
                    "perspective(1000px) rotateY(360deg) rotateX(0deg) translateZ(0)"
            }
        ],
        {
            duration,
            easing: "ease-in-out",
            fill: "forwards"
        }
    );
}