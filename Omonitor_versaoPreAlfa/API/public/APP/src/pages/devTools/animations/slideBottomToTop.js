export default function slideBottomToTop(
    element,
    duration = 600
) {
    element.animate(
        [
            {
                transform: "translateY(100%)",
                opacity: 0
            },
            {
                transform: "translateY(0)",
                opacity: 1
            }
        ],
        {
            duration,
            easing: "ease",
            fill: "forwards"
        }
    );
}

