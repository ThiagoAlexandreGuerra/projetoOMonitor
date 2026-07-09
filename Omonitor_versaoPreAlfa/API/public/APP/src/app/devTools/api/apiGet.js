import { ENDPOINT_API } from "./endpointApi.js";

export default async function get(service) {
    
    let url = `${ENDPOINT_API+service}`
    console.log(url);
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;

    } catch (error) {
        console.error('Erro no GET:', error);
        return null;
    }
}