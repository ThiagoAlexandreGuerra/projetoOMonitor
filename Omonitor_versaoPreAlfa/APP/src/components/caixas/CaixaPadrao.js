import gerarIdElemento from "../../javascript/utils/geraIdElemento.js";
import obterIdPai from "../../javascript/services/obterIdPai.js";
import desaparecer from "../../javascript/behaviors/desaparecer.js";
import aparecer from "../../javascript/behaviors/aparecer.js";
import toggleVisibilidade from "../../javascript/behaviors/toggleVisibilidade.js";
import ConfiguracaoPadrao from "../configuracaoPadrao/ConfiguracaoPadrao.js";
import renderizarElementos from "../../javascript/utils/renderizarElementos.js";

//***********************************************
//Lembrar de fazer gerarIdElemento id funcionar *
//***********************************************

export default class CaixaPadrao extends ConfiguracaoPadrao{

    constructor( objMovel = false , temFilho = false , souFilho = false ){

        super();
        
        this._validaEntrada(objMovel, temFilho, souFilho);
        
        this._temFilho               = temFilho;
        this._souFilho               = souFilho;
        this._objMovel               = objMovel;
        this.isDragging              = false;
        this.offsetX                 = 0;
        this.offsetY                 = 0;
        this._id                     = souFilho?"":gerarIdElemento("001" , null , "00");
        this._mapComBotoes           = null;

        this._tamanhoPercentuaFilhoComparadoAoElementoPai= 0.8;
        
        
        this.renderizarCaixaPadrao();
        this._passarElementoParaClassePai(this.elemento);
        
        if (this._objMovel) {
            this.elemento.addEventListener("mousedown", (e) => this._mouseDownEvent(e));
            document.addEventListener("mousemove", (e) => this._mouseMoveEvent(e));
            document.addEventListener("mouseup", (e) => this._mouseUpEvent(e));
        }

        if(this._temFilho){
            this._caixaFilha = new CaixaPadrao(false , this._temFilho-1 , true);
            this._caixaFilhaConfg();
            this.elemento.appendChild(this._caixaFilha.elemento);

        }

    }

    get getMapComBotoes()       { return this._mapComBotoes; }
    get getCaixaFilha()         { return this._caixaFilha;}
    get getCaixaNeta()          { return this._caixaFilha.getCaixaFilha;}
    get getId()                 { return this._id;}

    get getElemento()           { return this.elemento;}
    get getElementoFilho()      { return this._caixaFilha?.elemento || null;}
    get getElementoNeto()       {return this._caixaFilha?.getCaixaFilha?.elemento || null;}
    
   
    _validaEntrada(objMovel, temFilho, souFilho){

        if(typeof objMovel !== "boolean"){
            throw new TypeError(
                "objMovel precisa ser boolean (true ou false)"
            );
        }

        const temFilhoValido =
            typeof temFilho === "boolean" ||
            (
                typeof temFilho === "number" &&
                Number.isInteger(temFilho) &&
                temFilho >= 0 &&
                temFilho <= 3
            );

        if(!temFilhoValido){
            throw new TypeError(
                "temFilho precisa ser boolean ou número inteiro entre 0 e 3"
            );
        }

        if(typeof souFilho !== "boolean"){
            throw new TypeError(
                "souFilho precisa ser boolean (true ou false)"
            );
        }

        return true;
    }
    
    _caixaFilhaConfg(){

        this._caixaFilha.atribuirWidth=parseFloat(this._width) * this._tamanhoPercentuaFilhoComparadoAoElementoPai;
        this._caixaFilha.atribuirHeight="auto";
        this._caixaFilha.atribuirBackgroundColor="blue";
        this._caixaFilha.atribuirDisplay="inline-block";
        this._caixaFilha.atribuirFlexWrap       = "nowrap";
        this._caixaFilha.atribuirFlexDirection  = "row";

        this._caixaFilha.atribuirId= gerarIdElemento("001", this._id , "02");
    }

    _mouseDownEvent(e){
        this.isDragging = true;

        this.offsetX = e.clientX - this.elemento.offsetLeft;
        this.offsetY = e.clientY - this.elemento.offsetTop;

        this.elemento.style.transform = "none";
    }

    _mouseMoveEvent(e){
        if (!this.isDragging) return;

        this.elemento.style.left = `${e.clientX - this.offsetX}px`;
        this.elemento.style.top = `${e.clientY - this.offsetY}px`;
    }

    _mouseUpEvent(e){
         this.isDragging = false;
    }

    _mouseMoveEventParaWindow(e){
        position_x=evento.clientX
        position_y=evento.clientY

        let rotate= Math.atan2(position_y,position_x)*180/Math.PI

    }

    _renderButtons(adicionarAQualCamada) {
    if (!this.elemento || !this._mapComBotoes) return;

    for (const botao of this._mapComBotoes.values()) {
        if (!botao?.getElement) continue;

        switch (adicionarAQualCamada) {
                case 0:
                    this.elemento.appendChild(botao.getElement);
                    break;

                case 1:
                    this.getElementoFilho?.appendChild(botao.getElement);
                    break;

                case 2:
                    this.getElementoNeto?.appendChild(botao.getElement);
                    break;

                default:
                    console.warn("Camada inválida");
            }
        }
    }

    _on(event, callback){
        this.elemento.addEventListener(event, callback);
        return this;
    }

    _aparecer(){
        aparecer(this.elemento);
    }

    _desaparecer(){
        desaparecer(this.elemento);
    }

    _toggleVisibilidade(){
        toggleVisibilidade(this.elemento);
    }

    _addChild(child){

        if(!(this.getElementoFilho==null)){

            this.getElementoFilho.appendChild(child);
        }else{
            throw new Error("Elemento precisar ter expresamente 1 filho , tente algo como const elemento = new CaixaPadrao(false , 1 , false);");
        }
    }

    _addMapComBotoes(mapBotoes = null , adicionarAQualCamada = 0 ){
        
        if(!mapBotoes){ throw new Error ("Em '_addMapComBotoes', você precisa passar um arrey map com os botões que seja válido!!!")};
        if(adicionarAQualCamada<0 || adicionarAQualCamada>2){ throw new Error( "Em '_addMapComBotoes' , você precisa passar uma camada valida não a uma camada menor que 0,a primeira, ou maior que 2 , a ultima!!")};

        this._mapComBotoes = mapBotoes;
        this._renderButtons(adicionarAQualCamada);
        
    }

    renderizarCaixaPadrao(){

        this.elemento= renderizarElementos(
        "div",    
        {

            width:              this._width,
            height:             this._height,
            backgroundColor:    this._backgroundColor,
            display:            this._display,
            position:           this._position,
            top:                this._top,
            borderRadius:       this._borderRadius,
            justifyContent:     this._justifyContent,
            alignItems:         this._alignItems,
            padding:            this._padding,
            boxShadow:          this._boxShadow,
            flexDirection:      this._flexDirection,
            left:               this._left,
            right:              this._right,
            transform:          this._transform,
            cursor:             this._cursor,
            wordWrap:           this._wordWrap,
            overflow:           this._overflow, 
            overflowX:          this._overflowX,
            overflowY:          this._overflowY,
            color:              this._color,
            marginBottom:       this._marginBottom,
            flexWrap:           this._flexWrap,
            boxSizing:          this._boxSizing,


        } ,
        {},
        true);

        this.elemento.classList.add("caixa-scroll");
        this.elemento.classList.add("caixaPadrao");


    }
}