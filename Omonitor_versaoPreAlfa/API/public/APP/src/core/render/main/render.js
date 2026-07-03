import createFunctionsMap, {functionsMap} from "../../virtualDOM/functionHandlers/createFunctionsMap.js";
import renderTreeObjects from "../renders/renderTreeObject.js";
import enableElementMethods from "../../systemComponents/componentFunctions/wrapComponent/enables/enableElementMethods.js";
import renderDiff from "../renders/renderDiff.js";
import renderUpdate from "../renders/renderUpdate.js";
import cleanDOMElementsById from "../../utils/tools/cleanDOMElementsById.js";
import renderComponentUpdate from "../renders/renderComponentUpdate.js";


export default function render(tree){

    
    queueMicrotask(()=>{renderMain(tree)});
}

function renderMain(tree){
   
    if(Array.isArray(tree)){
        
        if(getValueChangedNewValue(tree)){
            
            renderDiff(tree);
            createFunctionsMap(getValueChangedNewValue(tree));
            
        }else if(getAddedVTBNode(tree)){
        
            renderUpdate([getAddedVTBNode(tree)]);
            createFunctionsMap(getAddedVTBNode(tree));
        } 
       
    }else{

        if(tree.objType == `precisionDiff`){
           
            if(tree.removedChildrens[0]){
                
                tree.removedChildrens.forEach(comp => {
                    comp.removedChildrenIds.forEach((id)=>{
                        cleanDOMElementsById(id);
                    })

                });
            }

            if(tree.addedChildrens[0]){
                
                tree.addedChildrens.forEach((comp)=>{
                    comp.newChildren.forEach((Child)=>{
                        renderComponentUpdate(Child);
                        createFunctionsMap(Child);
                    })
                })
            }

            if(tree.updatedNodes[0]){
                console.log("updateChild able")
            }
        }else{

            renderTreeObjects(tree);
            createFunctionsMap(tree);
        }
    }
    enableElementMethods();
}

function getValueChangedNewValue(diffs) {

    const diff = diffs.find(
        diff => diff.type === "VALUE_CHANGED"
    );

    return diff ? diff.newValue : null;
}

function getAddedVTBNode(diffs) {

    const diff = diffs.find(diff =>
        diff.type === "ADDED" &&
        diff.nodeId.startsWith("VTB")
    );

    return diff? diff.newValue : null;
}
