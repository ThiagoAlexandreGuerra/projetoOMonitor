export default class TextoLandingPage {
    constructor() {
        // Hero Section
        this._tituloPrincipal = `
            <span style="border: 2px solid white; padding: 4px 12px; display: inline-block; margin-bottom: 20px;">
                O Monitor
            </span>
            <br>
            Prepare-se para o<br>
            <span style="color: #ffffff; border-bottom: 2px solid white;">
                Banco do Brasil
            </span>
        `;

        this._subtitulo = `
            Mais de 1000 questões de provas anteriores, filtradas por 
            disciplina, assunto e nível de dificuldade. Acompanhe seu 
            desempenho e alcance sua aprovação.
        `;

        this._sobreNosTexto = `
            O Monitor nasceu da 
            necessidade de uma ferramenta gratuita e eficiente para ajudar 
            concurseiros a se prepararem para o concurso do Banco do Brasil.
        `;

        // Matérias com ícones (usando Font Awesome)
        this._materias = [
            { nome: "Matemática", icone: "fa-calculator", questoes: "250+ questões" },
            { nome: "Estatística", icone: "fa-chart-line", questoes: "180+ questões" },
            { nome: "Direito", icone: "fa-gavel", questoes: "320+ questões" },
            { nome: "Português", icone: "fa-language", questoes: "200+ questões" },
            { nome: "Raciocínio Lógico", icone: "fa-brain", questoes: "150+ questões" },
            { nome: "Conhecimentos Bancários", icone: "fa-university", questoes: "300+ questões" },
            { nome: "Economia", icone: "fa-chart-pie", questoes: "120+ questões" },
            { nome: "Informática", icone: "fa-laptop-code", questoes: "180+ questões" }
        ];

        this._stats = [
            { numero: "1000+", label: "Questões" },
            { numero: "10+", label: "Disciplinas" },
            { numero: "5000+", label: "Usuários" }
        ];
    }

    get tituloPrincipal() { return this._tituloPrincipal; }
    get subtitulo() { return this._subtitulo; }
    get sobreNosTexto() { return this._sobreNosTexto; }
    get materias() { return this._materias; }
    get stats() { return this._stats; }
}