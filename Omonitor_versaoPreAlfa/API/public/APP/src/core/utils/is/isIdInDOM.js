export default function isIdInDOM(id){
    let element = document.getElementById(id);
    return element? true : false;
}