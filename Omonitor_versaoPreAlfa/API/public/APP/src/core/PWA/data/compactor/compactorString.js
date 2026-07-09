import * as pako from "./pako/dist/pako.mjs";

const texto = "Lorem ipsum dolor sit amet...";

export const comprimido = pako.deflate(texto);

