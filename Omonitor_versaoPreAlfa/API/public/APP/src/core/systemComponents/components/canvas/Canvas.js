import StandardComponent from "../../standardComponent/main/StandardComponent.js";
import getId from "../../componentIdentify/componentId/getId.js";
import getDOMElementById from "../../../utils/getters/getDOMElementById.js";

export default class Canvas extends StandardComponent {

    constructor() {

        super("canvas");

        this._classNName.push("Canvas");
        this._classIdentify = "CNV";
        this._id = getId(this._classIdentify);

        this._updatePropertyConfig({
            className: this.getElementClassNames(),
            id: this._id,
        });

        this.canvas = null;
        this.ctx = null;

        this.init()
    }

    async init() {

        this.canvas = await getDOMElementById(this._id, true);
        console.log(`this.canvas:   `)
        console.log(this.canvas)
        this.ctx = this.canvas.getContext("2d");
        this.example()

    }

    clear() {

        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

    }

    drawAxis() {

        this.ctx.beginPath();

        this.ctx.moveTo(50, 20);
        this.ctx.lineTo(50, 350);

        this.ctx.lineTo(750, 350);

        this.ctx.stroke();

    }

    drawBar(x, y, width, height) {

        this.ctx.fillRect(x, y, width, height);

    }

    drawLine(x1, y1, x2, y2) {

        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();

    }

    drawCircle(x, y, radius) {

        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();

    }

    drawText(text, x, y) {

        this.ctx.fillText(text, x, y);

    }

    example() {

    const parent = this.canvas.parentElement;

    const width = parent.clientWidth;
    const height = parent.clientHeight;

    // O tamanho interno do canvas deve ser igual ao tamanho da div.
    this.canvas.width = width;
    this.canvas.height = height;

    // Também ocupa toda a área visual.
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";

    this.clear();

    const ctx = this.ctx;

    // Fundo transparente.
    ctx.clearRect(0, 0, width, height);

    // Cor das colunas.
    ctx.fillStyle = "white";

    // Eixos.
    ctx.strokeStyle = "rgba(255,255,255,.6)";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(40, 15);
    ctx.lineTo(40, height - 30);
    ctx.lineTo(width - 15, height - 30);
    ctx.stroke();

    const values = [90, 130, 60, 170, 110, 150];

    const bottom = height - 30;
    const graphHeight = height - 60;

    const barWidth = 45;
    const spacing = 35;

    let x = 70;

    for (const value of values) {

        const h = graphHeight * (value / 170);

        ctx.fillRect(
            x,
            bottom - h,
            barWidth,
            h
        );

        x += barWidth + spacing;
    }

}

}