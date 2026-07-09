import isIdInDOM from "../../utils/is/isIdInDOM.js";
export default function isComponentInDom(component){
    return isIdInDOM(component._id);
}