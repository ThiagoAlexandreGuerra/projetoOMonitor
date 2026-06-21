export default function enableAddEventListener(addEventListenerFunction) {

    addEventListenerFunction.forEach(({eventType, callbackFunction}) => {
        
        if ((typeof eventType == "string") && (typeof callbackFunction == "function")) {
            
            this.addEventListener(eventType, callbackFunction);
        }
    });
    
   
}