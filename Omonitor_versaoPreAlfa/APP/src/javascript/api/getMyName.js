import get from "./apiGet.js";
import { ENDPOINT_API } from "./endpointApi.js";



export default async function getMyName(){
    
    const resposta = await get(
        ENDPOINT_API +'MyName'
    );

    console.log(resposta);
}