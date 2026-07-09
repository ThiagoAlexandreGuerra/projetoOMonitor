import waitComponent from "../../render/renderCheck/waitComponent.js";
import isIdInDOM from "../is/isIdInDOM.js";

export default async function getDOMElementById(id , await_ = false){

    if(isIdInDOM(id)){
        return getComponent(id);
    }else if(await_){

       if(await waitComponent( null , id ))
        return getComponent(id);

    }else{
        return null;
    }
}

function getComponent(id){
    return document.getElementById(id);
}
