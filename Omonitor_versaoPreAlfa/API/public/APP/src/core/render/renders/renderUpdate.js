import createElement from "./createElement/createElement.js";

export default function renderUpdate(bodyObject) {

    document.body.innerHTML = "";

    if(bodyObject[0].id.includes(`VTB`)){
        document.body.appendChild(
            createElement(bodyObject[0])
        );
    }else{

        bodyObject[0].children.forEach(child => {
    
            document.body.appendChild(
                createElement(child)
            );
    
        });
    }

}
