export default function inspectFunction(func) {
    return {
        name: func.name,
        parameterCount: func.length,
       // parameters: getParameters(func),
        source: func.toString(),
    };
}

