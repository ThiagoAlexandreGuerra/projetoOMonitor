const __classCounters = new Map();

export default function getId(classIdentifier = "ELM") {

    if (
        typeof classIdentifier !== "string" ||
        classIdentifier.length < 3
    ) {
        throw new Error(
            "Class identifier must contain at least 3 characters."
        );
    }

    // Mantém apenas letras e números
    const normalizedIdentifier =
        classIdentifier
            .replace(/[^a-zA-Z0-9]/g, "")
            .toUpperCase()
            .slice(0, 3);

    // Recupera contador atual
    const currentCounter =
        __classCounters.get(normalizedIdentifier) || 0;

    // Incrementa contador
    const nextCounter =
        currentCounter + 1;

    __classCounters.set(
        normalizedIdentifier,
        nextCounter
    );

    // Timestamp reduzido
    const timestamp =
        Date.now().toString(36);

    // Número aleatório
    const random =
        Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase();

    // Contador formatado
    const counter =
        String(nextCounter)
            .padStart(4, "0");

    return (
        normalizedIdentifier +
        "-" +
        counter +
        "-" +
        timestamp +
        "-" +
        random
    );
}