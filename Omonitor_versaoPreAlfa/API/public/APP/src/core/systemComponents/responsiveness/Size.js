import getDOMElementById from "../../utils/getters/getDOMElementById.js";
import isComponentInDom from "../../render/renderCheck/isComponentInDom.js";
import getCaller from "../../utils/getters/getCaller.js";
export default class Size {

    static async toPx(value , id , isHeight = false ) {
        
        let referenceElement = null;
        
        await getDOMElementById(id , true)
        .then((resp)=>{
            referenceElement = resp;
        })
        .catch((rej)=>{
            console.warn(`In Size.js, error:${rej}`)
        })

        if (typeof value === "number")
            return value;

        if (typeof value !== "string")
            return 0;
        
        if(typeof value == "string" && value.trim() === "auto"){

            return isHeight?referenceElement.getBoundingClientRect().height:referenceElement.getBoundingClientRect().width;
        }    
        value = value.trim();
        
        const number = parseFloat(value);
    
        if (Number.isNaN(number))
            return 0;

        if (value.endsWith("px"))
            return number;

        if (value.endsWith("%")) {
            const parent = referenceElement.parentElement;

            if (!parent)
                return number;

            return parent.clientWidth * (number / 100);
        }

        if (value.endsWith("vw"))
            return window.innerWidth * (number / 100);

        if (value.endsWith("vh"))
            return window.innerHeight * (number / 100);

        if (value.endsWith("vmin"))
            return Math.min(window.innerWidth, window.innerHeight) * (number / 100);

        if (value.endsWith("vmax"))
            return Math.max(window.innerWidth, window.innerHeight) * (number / 100);

        if (value.endsWith("rem")) {

            const rootSize = parseFloat(
                getComputedStyle(document.documentElement).fontSize
            );

            return rootSize * number;
        }

        if (value.endsWith("em")) {

            const fontSize = parseFloat(
                getComputedStyle(referenceElement).fontSize
            );

            return fontSize * number;
        }

        if (value.endsWith("ch")) {

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            ctx.font = getComputedStyle(referenceElement).font;

            return ctx.measureText("0").width * number;
        }

        return number;
    }

}