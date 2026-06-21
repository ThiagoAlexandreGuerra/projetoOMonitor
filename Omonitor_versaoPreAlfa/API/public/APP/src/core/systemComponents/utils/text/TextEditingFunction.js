export default class TextEditFunction {

    constructor() {

    }

    _applySyntaxHighlighting(text , fontFamily = "Arial, sans-serif") {

        const colors = {
            keyword: "#006cc5",
            string: "#e05822",
            number: "#84c75f",
            function: "#d8d826",
            comment: "#9deb78",
            default: "#D4D4D4"
        };

        // Escapa HTML
        text = text
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        // Comentários //
        text = text.replace(
            /(\/\/.*$)/gm,
            `<span style="color:${colors.comment}">$1</span>`
        );

        // Strings em contexto de código:
        // = "..."
        // : "..."
        // ("...")
        // , "..."
        text = text.replace(
            /([=:,(]\s*)(["'`])((?:\\.|(?!\2).)*?)\2/g,
            (_, prefix, quote, content) =>
                `${prefix}<span style="color:${colors.string}">${quote}${content}${quote}</span>`
        );

        // Palavras-chave
        text = text.replace(
            /\b(const|let|var|function|class|return|if|else|for|while|new|export|default|import|from|this)\b/g,
            `<span style="color:${colors.keyword}; font-weight:bold;">$1</span>`
        );

        // Números
        text = text.replace(
            /\b(\d+(\.\d+)?)\b/g,
            `<span style="color:${colors.number}">$1</span>`
        );

        // Funções
        text = text.replace(
            /\b([a-zA-Z_$]\w*)(?=\s*\()/g,
            `<span style="color:${colors.function}">$1</span>`
        );

        return `
<pre style="
    
    color:${colors.default};
    padding:16px;
    border-radius:8px;
    font-family:${fontFamily};
    white-space:pre-wrap;
">${text}</pre>
        `;
    }

}