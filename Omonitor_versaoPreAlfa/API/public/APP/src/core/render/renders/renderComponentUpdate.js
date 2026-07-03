import createElement from "./createElement/createElement.js";

export default function renderComponentUpdate(component){

    const parent = document.getElementById(component.parentId);
    parent.appendChild(createElement(component));

}    
