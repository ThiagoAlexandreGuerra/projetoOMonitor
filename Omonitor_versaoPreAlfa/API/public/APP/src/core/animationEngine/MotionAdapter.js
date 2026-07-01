import { animate } from "https://cdn.jsdelivr.net/npm/motion/+esm";
import { waitComponent } from "../render/renderCheck/waitComponent.js";
import observeComponent from "../render/renderCheck/observeComponent.js";
export default class MotionAdapter {

    /**
     * direction:
     * "left"
     * "right"
     * "up"
     * "down"
     */
    slide(direction = "left", duration = 3, ...components) {

        const animations = {
            left: {
                x: ["100%", "0%"]
            },

            right: {
                x: ["-100%", "0%"]
            },

            up: {
                y: ["100%", "0%"]
            },

            down: {
                y: ["-100%", "0%"]
            }
        };

        const animation = animations[direction];

        if (!animation) {
            throw new Error(`Direção "${direction}" inválida.`);
        }

        console.log(components)
        for (const component of components[0]) {
          
            const observer = observeComponent(component, state => {

                if (state) {

                    console.log("Elemento apareceu!");
                    const element = document.getElementById(component._id);
                
                    animate(
                        element,
                        {
                            ...animation,
                            opacity: [0, 1]
                        },
                        {
                            duration,
                            easing: "ease-out"
                        }
                    );

                } else {

                    console.log("Elemento desapareceu!");

                }

            })
           
        }

    }

}