import createFunctionsMap, {functionsMap} from "../../virtualDOM/functionHandlers/createFunctionsMap.js";
import renderTreeObjects from "../renders/renderTreeObject.js";
import enableElementMethods from "../../systemComponents/componentFunctions/wrapComponent/enables/enableElementMethods.js";
import renderDiff from "../renders/renderDiff.js";


export default function render(tree){

    
    queueMicrotask(()=>{renderAux(tree)});
}

function renderAux(tree){

    if(Array.isArray(tree)){
        
        renderDiff(tree);
    }else{
        renderTreeObjects(tree);
    }
    createFunctionsMap(tree);
    enableElementMethods();
}