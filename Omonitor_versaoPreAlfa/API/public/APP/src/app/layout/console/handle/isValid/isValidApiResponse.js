export default function isValidApiResponse(apiResponse) {

        if (apiResponse === null || typeof apiResponse !== "object") {
            return false;
        }

        if (!("id" in apiResponse) || typeof apiResponse.id !== "number") {
            return false;
        }

        if (!("comando" in apiResponse) || typeof apiResponse.comando !== "string") {
            return false;
        }

        if (
            !("alternativas" in apiResponse) ||
            !Array.isArray(apiResponse.alternativas)
        ) {
            return false;
        }

        if (
            !("gabarito" in apiResponse) ||
            typeof apiResponse.gabarito !== "string"
        ) {
            return false;
        }

        if (
            !("resolucao" in apiResponse) ||
            typeof apiResponse.resolucao !== "string"
        ) {
            return false;
        }

        return true;
}
