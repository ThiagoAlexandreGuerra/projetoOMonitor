export default function enableFunctions(functions){
 
    functions.forEach(fn => {
            if (typeof fn === "function") {
                 this.addEventListener("click", fn);
            }
    });

}