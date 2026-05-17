import get from "./apiGet.js";
import { ENDPOINT_API } from "./endpointApi.js";

export default async function pedirSequenciaDeNumerosAleatotios() {

    const resposta = await get(
        ENDPOINT_API+'random'
    );

    console.log(ENDPOINT_API+'random')

    console.log(resposta);
}

