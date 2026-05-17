import Formulario from "../../../../components/formulario/Formulario.js";

export default function formulario(eventos){

    let formulario = new Formulario("Login: " ,"text","email","password");
    
            
    formulario.atribuirLeft="200px";
    formulario.atribuirTop="250px";
    formulario.atribuirWidth= "900px";
    //formulario._desaparecer();
}