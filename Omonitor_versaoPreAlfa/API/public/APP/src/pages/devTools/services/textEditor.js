export default class textEditor{

    constructor(){

    }

    _estilizarCodigo(texto) {

        const cores = {
            keyword: "#569CD6",
            string: "#CE9178",
            number: "#B5CEA8",
            func: "#DCDCAA",
            comment: "#6A9955",
            default: "#D4D4D4"
        };

        texto = texto
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        // comentários
        texto = texto.replace(
            /(\/\/.*$)/gm,
            `<span style="color:${cores.comment}">$1</span>`
        );

        // strings
        texto = texto.replace(
            /(["'`])(.*?)(\1)/g,
            `<span style="color:${cores.string}">$1$2$3</span>`
        );

        // palavras reservadas
        texto = texto.replace(
            /\b(const|let|var|function|class|return|if|else|for|while|new|export|default|import|from|this)\b/g,
            `<span style="color:${cores.keyword}; font-weight:bold;">$1</span>`
        );

        // números
        texto = texto.replace(
            /\b(\d+)\b/g,
            `<span style="color:${cores.number}">$1</span>`
        );

        // funções
        texto = texto.replace(
            /\b([a-zA-Z_]\w*)(?=\()/g,
            `<span style="color:${cores.func}">$1</span>`
        );

        return `
            <pre style="
                background:#1e1e1e;
                color:${cores.default};
                padding:16px;
                border-radius:8px;
                font-family:Consolas, monospace;
                white-space:pre-wrap;
            ">${texto}</pre>
        `;
    }
}