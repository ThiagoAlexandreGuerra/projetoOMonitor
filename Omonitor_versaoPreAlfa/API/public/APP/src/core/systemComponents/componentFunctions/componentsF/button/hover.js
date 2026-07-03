import adjustColorIntensity from "../../../utils/styles/adjustColorIntensity.js";

export default function hover(styles = {}) {

    this.addEventListener("mouseenter", () => {
            this.style.ransformOrigin= "center center"
            this.style.transform= `scale(1.07)`
            this.style.transition= "all .2s ease"
        });

        this.addEventListener("mouseleave", () => {
            this.style.transform = "scale(1)";
            this.style.backgroundColor = this._backgroundColor;
        });
}