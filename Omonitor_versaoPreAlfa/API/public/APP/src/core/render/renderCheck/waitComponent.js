import DOMToObject from "../../virtualDOM/getDOM/DOMToObject.js"
export default function waitComponent(component = null , id = "") {

    return new Promise(resolve => {

        if (document.getElementById(component?._id || id)) {
            resolve(true);
            return;
        }

        const observer = new MutationObserver(() => {

            if (document.getElementById(component?._id || id )) {

                observer.disconnect();

                resolve(true);

            }

        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

    });

}