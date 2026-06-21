import StandardComponent from "../../standardComponent/standardComponent.js";
import AnchorButton from "../buttons/AnchorButton.js";
import getId from "../../componentIdentify/componentId/getId.js";


export default class AnchorLinkHorizontal extends StandardComponent{

    constructor(...anchorElement){

        super();
               

                this._className.push("ALH");
                this._classIdentify = "AnchorLinkHorizontal";
                this._id = getId(this._classIdentify);
        
                this._updatePropertyConfig({
                    id: this._id,
                    className: this.getElementClassNames(),
                    innerHTML: "nav: "
                });

                this._updateStyleConfig({
                    backgroundColor:"inherit",
                    width: "600px",
                    height: "auto",
                    zIndex:2,
                    whiteSpace:"nowrap"
                })

                anchorElement[0].forEach( (anchorIdentify) => {
                    let anchorButton = new AnchorButton(anchorIdentify.id , anchorIdentify.text)
                            .setPosition("relative")
                            .setDisplay("inline")
                            .setPadding("5px")
                            .setWhiteSpace("nowrap")
                            .setBorder("")
                            .setBorderBottom("2px solid white")
                            .setFontFamily("Arial, sans-serif")
                            .setBackgroundColor("inherit")
                            .setBorderRadius("")
                            
                    this._addChild(anchorButton);
                });

                
    }

     getPageSize() {
        return {
            width: Math.max(
                document.body.scrollWidth,
                document.documentElement.scrollWidth
            ),
            height: Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight
            )
        };
    }

}
