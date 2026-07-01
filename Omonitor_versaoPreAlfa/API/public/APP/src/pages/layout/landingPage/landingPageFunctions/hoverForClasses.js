export default function hoverForClasses(styles = {}) {

    let previousStyle = this.style;
    this.addEventListener("mouseenter", () => {

        this.style.transition = "all .2s ease";
        this.style.transform = "translateY(-8px)";
        this.style.borderColor = "#ffd900";
        this.style.boxShadow = "0 8px 16px rgba(255, 208, 0, 0.2)";

    });

    this.addEventListener("mouseleave", () => {

        this.style.transform = "translateY(0)";
        this.style.borderColor = "#02008f";
        this.style.boxShadow = "none";

    });

}