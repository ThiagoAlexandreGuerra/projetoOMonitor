
export default function obterIdPai(idFilho) {
    const partes = idFilho.split(".");

    const idPai = partes[1];

    if (idPai === "000000000000000000") {
        return null;
    }

    return idPai;
}