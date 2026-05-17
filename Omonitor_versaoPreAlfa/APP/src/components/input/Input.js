import renderizarElementos from "../../javascript/utils/renderizarElementos.js";

export default class Input {

    constructor(tipoInput = "text") {

        this._validaEntrada(tipoInput);

        this._tipoInput = tipoInput.toLowerCase();

        this._width             = "80%";
        this._height            = "45px";
        this._backgroundColor   = "transparent";
        this._display           = "block";
        this._position          = "relative";
        this._border            = "none";
        this._borderBottom      = "2px solid rgba(255,255,255,0.35)";
        this._padding           = "8px 0";
        this._marginTop         = "6px";
        this._color             = "#ffffff";
        this._required          = false;
        this._autocomplete      = "off";

        this._definirMetaAutomaticamente();
        this.renderizarInput();
        this._hover();
        this._placeholderStyle();
        
    }

    get getInputElement()   { return this.elemento; }
    get getTipoInput()      { return this._tipoInput; }
    get getLabel()          { return this._label; }
    get getPlaceholder()    { return this._placeholder; }

    
    get getData() { return this.elemento ? this.elemento.value : null; }

    set atribuirTipoInput(valor) {
        this._validaEntrada(valor);

        this._tipoInput = valor.toLowerCase();
        this._definirMetaAutomaticamente();

        if (this.elemento) {
            this.elemento.type = this._tipoInput;
            this.elemento.placeholder = this._placeholder;
            this.label.textContent = this._label;
        }
    }

    set atribuirWidth(value) { this._set("_width", "width", value); }
    set atribuirHeight(value) { this._set("_height", "height", value); }

    _set(prop, styleProp, value) {
        this[prop] = value;

        if (this.elemento) {
            this.elemento.style[styleProp] = value;
        }
    }

    _definirMetaAutomaticamente() {

        const mapa = {
            email: {
                label: "Email",
                placeholder: "Digite seu email"
            },
            password: {
                label: "Senha",
                placeholder: "Digite sua senha"
            },
            text: {
                label: "Texto",
                placeholder: "Digite aqui"
            },
            number: {
                label: "Número",
                placeholder: "Digite um número"
            },
            date: {
                label: "Data",
                placeholder: ""
            }
        };

        const meta = mapa[this._tipoInput] || {
            label: "Campo",
            placeholder: "Preencha"
        };

        this._label = meta.label;
        this._placeholder = meta.placeholder;
    }

    _validaEntrada(tipoInput) {

        const tiposPermitidos = [
            "text",
            "password",
            "email",
            "number",
            "date",
            "checkbox",
            "radio",
            "file",
            "color",
            "range"
        ];

        if (!tiposPermitidos.includes(tipoInput.toLowerCase())) {
            throw new Error(`Tipo inválido: ${tipoInput}`);
        }
    }

    _hover() {

        this.elemento.addEventListener("focus", () => {
            this.elemento.style.borderBottom = "2px solid #aa0000de";
        });

        this.elemento.addEventListener("blur", () => {
            this.elemento.style.borderBottom = this._borderBottom;
        });
    }

    _placeholderStyle() {

        const style = document.createElement("style");

        style.textContent = `
            input::placeholder {
                color: rgba(255,255,255,0.85);
            }
        `;

        document.head.appendChild(style);
    }

    renderizarInput() {

        this.container = renderizarElementos("div", {
            display: "flex",
            flexDirection: "column",
            gap: "8px"
        });

        this.label = renderizarElementos(
            "label",
            {
                color: "#ffffff",
                fontSize: "14px"
            },
            {
                textContent: this._label
            }
        );

        this.elemento = renderizarElementos(
            "input",
            {
                width: this._width,
                height: this._height,
                backgroundColor: this._backgroundColor,
                color: this._color,
                border: this._border,
                borderBottom: this._borderBottom,
                padding: this._padding,
                outline: "none",
                fontSize: "16px"
            },
            {
                type: this._tipoInput,
                placeholder: this._placeholder
            }
        );

        this.container.appendChild(this.label);
        this.container.appendChild(this.elemento);

        this.elemento.classList.add("input");


        return this.container;
    }
}