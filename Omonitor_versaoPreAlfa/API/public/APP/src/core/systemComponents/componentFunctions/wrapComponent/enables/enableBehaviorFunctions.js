export default function enableBehaviorFunctions(functions) {

    functions.forEach(fn => {

        if (typeof fn === "function") {
            fn.call(this);
        }

    });

}