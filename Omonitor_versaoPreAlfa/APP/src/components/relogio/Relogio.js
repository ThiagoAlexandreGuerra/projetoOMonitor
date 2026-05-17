import CaixaPadrao from "../caixas/CaixaPadrao.js";
import SpanTime from "../spanTime/SpanTime.js";
export default class Relogio extends CaixaPadrao{

    constructor() {

        super(true,1,false);

        this.atribuirTop            = "7%";
        this.atribuirLeft           = "81.7%";
        this.atribuirHeight         = "30px";
        this.atribuirWidth          = "65px";
        this.atribuirPosition       = "absolute";
        this.atribuirFlexWrap       = "nowrap";
        this.atribuirFlexDirection  = "row";
        this.atribuirBackgroundColor= "transparent";
        this.atribuirBoxShadow      = "none";

        this.getCaixaFilha.atribuirHeight="28px";
        this.getCaixaFilha.atribuirWidth ="65px";
        
        this.getCaixaFilha.atribuirBackgroundColor  ="transparent";
        this.getCaixaFilha.atribuirBoxShadow        ="none";

        this._hora      = new SpanTime();
        this._minuto    = new SpanTime();
        this._segundo   = new SpanTime();

        this.getCaixaFilha.elemento.appendChild(this._hora.elemento);
        this.getCaixaFilha.elemento.appendChild(this._minuto.elemento);
        this.getCaixaFilha.elemento.appendChild(this._segundo.elemento);

        this.elemento.classList.add("relogio");


        this._time();
        setInterval(this._time.bind(this), 1000);
    }
    
    
    _time(){
        
        let datatoday= new Date()
        let hr  = datatoday.getHours()
        let min = datatoday.getMinutes()
        let seg = datatoday.getSeconds()

        let data_minutos_com_zero=(datatoday.getMinutes()>=10? datatoday.getMinutes(): "0"+datatoday.getMinutes())       //na anotação    
        let data_horas_com_zero=(datatoday.getHours()>=10? datatoday.getHours(): "0"+datatoday.getHours())
        let data_segundo_com_zero=(datatoday.getSeconds()>=10?datatoday.getSeconds(): "0"+datatoday.getSeconds())

        this._hora.text = data_horas_com_zero + ":";
        this._minuto.text = data_minutos_com_zero + ":";
        this._segundo.text = data_segundo_com_zero;
    }
}