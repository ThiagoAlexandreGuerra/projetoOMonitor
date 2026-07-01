import StandartBox from "../boxes/StandardBox.js";
import getId from "../../componentIdentify/componentId/getId.js";
import StandartComponent from "../../standardComponent/main/StandardComponent.js";

export default class GridLayout extends StandartBox {

    constructor(cardAmount = 1, columns = 1) {

        super();

        this._cardAmount = cardAmount;
        this._columns = columns;

        this._classNName.push("CardGrid");
        this._classIdentify = "CDG";
        this._id = getId(this._classIdentify);

        this._swapStyleConfig({
            width: "500px",
            height: "auto",
            display: "grid",
            gridTemplateColumns: `repeat(${this._columns}, 1fr)`,
            gap: "10px",
            padding: "10px",
            boxSizing: "border-box",
            backgroundColor: "rgb(34, 34, 34)",
            margin: "0 auto"
        });

        this._updatePropertyConfig({
            id: this._id,
            className: this.getElementClassNames()
        });

        this._createCards();

        this.gridElements = this._children;
    }

    _createCards() {

        for (let i = 0; i < this._cardAmount; i++) {

            const card = new StandartComponent();

            card
                .setPosition("static")
                .setWidth("100%")
                .setHeight("200px")
                .setBackgroundColor("black");

            this._children.push(card);
        }

        this._centerLastRow();
    }

    _centerLastRow() {

        const remainder = this._cardAmount % this._columns;

        // Se a última linha estiver completa, não há nada a fazer
        if (remainder === 0) return;

        // Índice do primeiro elemento da última linha
        const firstIndexLastRow = this._cardAmount - remainder;

        // Número de colunas vazias
        const emptyColumns = this._columns - remainder;

        // Quantas colunas devemos pular à esquerda
        const offset = Math.floor(emptyColumns / 2);

        // Faz o primeiro elemento da última linha começar mais à direita
        this._children[firstIndexLastRow]
            .setGridColumnStart(offset + 1);
    }

    getCard(index) {

        if (!(index >= 0 && index < this._children.length)) {
            throw new Error("index invalid for getCard!!");
        }

        return this._children[index];
    }

    getCardLength() {
        return this._children.length;
    }

}