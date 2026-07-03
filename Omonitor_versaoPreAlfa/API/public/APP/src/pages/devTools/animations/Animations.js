import depthEffect              from "./depthEffect.js";
import rotateClockwise          from "./rotateClockwise.js";
import rotateCounterClockwise   from "./rotateCounterClockwise.js";
import screenSpin3D             from "./screenSpin3D.js";
import slideBottomToTop         from "./slideBottomToTop.js";
import slideHorizontalV         from "./slideHorizontalV.js";
import slideTopToBottom         from "./slideTopToBottom.js";
import hover                    from "../../../core/systemComponents/componentFunctions/componentsF/button/hover.js";

import getDOMElement from "../../../core/systemComponents/utils/getters/getDOMElement.js";

export default class Animations {

    constructor() {

    }

    depthEffectAnimation(element, duration = 1000) {

        return () => {
            this.auxDepthEffectAnimation(element, duration);
        };
    }

    auxDepthEffectAnimation(element, duration) {

        if (this.isDurationValid(duration)) {
            depthEffect(
                getDOMElement(element),
                duration
            );
        }
    }

    rotateClockwiseAnimation(element, duration = 1000) {

        return () => {
            this.auxRotateClockwiseAnimation(element, duration);
        };
    }

    auxRotateClockwiseAnimation(element, duration) {

        if (this.isDurationValid(duration)) {
            rotateClockwise(
                getDOMElement(element),
                duration
            );
        }
    }

    rotateCounterClockwiseAnimation(element, duration = 1000) {

        return () => {
            this.auxRotateCounterClockwiseAnimation(element, duration);
        };
    }

    auxRotateCounterClockwiseAnimation(element, duration) {

        if (this.isDurationValid(duration)) {
            rotateCounterClockwise(
                getDOMElement(element),
                duration
            );
        }
    }

    screenSpin3DAnimation(element, duration = 1000) {

        return () => {
            this.auxScreenSpin3DAnimation(element, duration);
        };
    }

    auxScreenSpin3DAnimation(element, duration) {

        if (this.isDurationValid(duration)) {
            screenSpin3D(
                getDOMElement(element),
                duration
            );
        }
    }

    slideBottomToTopAnimation(element, duration = 1000) {

        return () => {
            this.auxSlideBottomToTopAnimation(element, duration);
        };
    }

    auxSlideBottomToTopAnimation(element, duration) {

        if (this.isDurationValid(duration)) {
            slideBottomToTop(
                getDOMElement(element),
                duration
            );
        }
    }

    slideHorizontalVAnimation(element, duration = 1000) {

        return () => {
            this.auxSlideHorizontalVAnimation(element, duration);
        };
    }

    auxSlideHorizontalVAnimation(element, duration) {

        if (this.isDurationValid(duration)) {
            slideHorizontalV(
                getDOMElement(element),
                duration
            );
        }
    }

    slideTopToBottomAnimation(element, duration = 1000) {

        return () => {
            this.auxSlideTopToBottomAnimation(element, duration);
        };
    }

    auxSlideTopToBottomAnimation(element, duration) {

        if (this.isDurationValid(duration)) {
            slideTopToBottom(
                getDOMElement(element),
                duration
            );
        }
    }

    isDurationValid(duration) {

        return (
            typeof duration === "number" &&
            duration >= 0
        );
    }

    hoverAnimation(styles={}){
        return function(){hover.call(this , styles);}
    }

}