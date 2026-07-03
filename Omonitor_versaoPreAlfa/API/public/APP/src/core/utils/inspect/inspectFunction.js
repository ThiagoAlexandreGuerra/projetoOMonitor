export default function inspectFunction(func) {
    return {
        name: func.name,
        parameterCount: func.length,
        parameters: getParameters(func),
        source: func.toString(),
    };
}

function getParameters(func) {
    const source = func.toString();

    const match = source.match(/\(([^)]*)\)/);

    if (!match) {
        return [];
    }

    return match[1]
        .split(",")
        .map(param => param.trim())
        .filter(Boolean);
}