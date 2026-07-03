export default function isComponentInDom(component){

    let element = document.getElementById(component._id);
    return element? true : false;
}