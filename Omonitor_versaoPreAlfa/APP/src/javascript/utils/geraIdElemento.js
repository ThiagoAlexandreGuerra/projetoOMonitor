//Indentificadores: 
//
//BarraLateral  -001
//Botao         -002
//CaixaPadrao   -003
//Cronometro    -004
//Relojo        -005
//SpanTime      -006
//Titulo        -007    
//    
//========================
//========================
//Padrao do código: indentificadorDaClasse.IdElementoPai.IdElemento.Camada;
//Exemplo: Uma caixa padrao filha de uma caixa padrao : 003.003000000000000100.0002.01;


const contadoresClasse = {};

export default function gerarIdElemento(classe, idPai = null, camada = 1) {

    if (idPai) {
        const partes = idPai.split(".");
        idPai = `${partes[0]}${partes[2]}`;
    }

    if (!contadoresClasse[classe]) {
        contadoresClasse[classe] = 1;
    }

    const idProprio = contadoresClasse[classe]
        .toString()
        .padStart(4, "0");

    contadoresClasse[classe]++;

    const paiFormatado = idPai
        ? idPai.padStart(18, "0")
        : "000000000000000000";

    const camadaFormatada = camada.toString().padStart(2, "0");

    return `${classe}.${paiFormatado}.${idProprio}.${camadaFormatada}`;
}