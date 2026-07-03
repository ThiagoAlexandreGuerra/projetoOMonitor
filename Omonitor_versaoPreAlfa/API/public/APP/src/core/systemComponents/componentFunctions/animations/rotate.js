export default function rotate(
    speed = 1
) {

    let angle = 0;

    function animate() {

        angle += speed;

        this.style.transform =
            `rotate(${angle}deg)`;

        requestAnimationFrame(
            animate
        );
    }

    animate();
}