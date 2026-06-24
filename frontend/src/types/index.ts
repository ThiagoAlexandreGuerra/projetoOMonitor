export type NivelDificuldade = "FACIL" | "MEDIO" | "DIFICIL";

export type StatusResposta =
  | "NAO_RESPONDIDA"
  | "EM_ANDAMENTO"
  | "RESPONDIDA_CORRETA"
  | "RESPONDIDA_INCORRETA"
  | "MARCADA_REVISAO";

export type TipoNotificacao = "LEMBRETE_ESTUDO" | "META_CONCLUIDA";

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  data_cadastro: string;
  ativo: boolean;
}

export interface Administrador {
  id: number;
  usuario_id: number;
  nivel_acesso: number;
  usuario?: Usuario;
}

export interface AdministradorCadastroDisponivel {
  disponivel: boolean;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface Disciplina {
  id: number;
  nome: string;
}

export interface Alternativa {
  id: number;
  texto: string;
  correta: boolean;
}

export interface AlternativaCreate {
  texto: string;
  correta: boolean;
}

export interface Questao {
  id: number;
  enunciado: string;
  assunto: string;
  ano: number;
  nivel: NivelDificuldade;
  explicacao: string;
  disciplina_id: number;
  alternativas?: Alternativa[];
}

export interface Resposta {
  id: number;
  usuario_id: number;
  questao_id: number;
  alternativa_selecionada_id?: number | null;
  data_resposta?: string | null;
  status: StatusResposta;
  correta?: boolean | null;
}

export interface MetaEstudo {
  id: number;
  usuario_id: number;
  quantidade_questoes: number;
  tempo_diario: number;
  data_criacao: string;
  ativa: boolean;
}

export interface Favorito {
  id: number;
  usuario_id: number;
  questao_id: number;
  data_marcacao: string;
  questao?: Questao;
}

export interface Estatistica {
  usuario_id: number;
  percentual_acerto: number;
  quantidade_acertos: number;
  quantidade_erros: number;
  quantidade_respondidas: number;
}
