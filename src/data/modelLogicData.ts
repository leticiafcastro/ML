import { CategoryId, CategoryInfo, ModelItem } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'Insumo',
    label: 'Insumo',
    badgeColor: 'bg-[#F0A328]/15 text-[#132A4E] border-[#F0A328]',
    borderColor: 'border-[#132A4E]/30',
    lightBg: 'bg-[#FFFFFF]',
    headerBg: 'bg-[#132A4E] text-white',
    totalItems: 3,
  },
  {
    id: 'Atividade',
    label: 'Atividade',
    badgeColor: 'bg-[#132A4E]/10 text-[#132A4E] border-[#132A4E]',
    borderColor: 'border-[#132A4E]/30',
    lightBg: 'bg-[#FFFFFF]',
    headerBg: 'bg-[#132A4E] text-white',
    totalItems: 3,
  },
  {
    id: 'Produto',
    label: 'Produto',
    badgeColor: 'bg-[#D96B17]/15 text-[#132A4E] border-[#D96B17]',
    borderColor: 'border-[#132A4E]/30',
    lightBg: 'bg-[#FFFFFF]',
    headerBg: 'bg-[#132A4E] text-white',
    totalItems: 3,
  },
  {
    id: 'Resultado',
    label: 'Resultado',
    badgeColor: 'bg-[#132A4E]/15 text-[#132A4E] border-[#132A4E]',
    borderColor: 'border-[#132A4E]/30',
    lightBg: 'bg-[#FFFFFF]',
    headerBg: 'bg-[#132A4E] text-white',
    totalItems: 3,
  },
  {
    id: 'Impacto',
    label: 'Impacto',
    badgeColor: 'bg-[#F0A328]/25 text-[#132A4E] border-[#F0A328]',
    borderColor: 'border-[#132A4E]/30',
    lightBg: 'bg-[#FFFFFF]',
    headerBg: 'bg-[#132A4E] text-white',
    totalItems: 1,
  },
];

export const RAW_ITEMS: ModelItem[] = [
  // Insumos (3)
  {
    id: 'item-ins-1',
    text: 'Estoque de medicamentos organizados nas prateleiras da farmácia',
    correctCategory: 'Insumo',
  },
  {
    id: 'item-ins-2',
    text: 'Estação de trabalho equipada com computador, leitor de código de barras e sistema de gestão',
    correctCategory: 'Insumo',
  },
  {
    id: 'item-ins-3',
    text: 'Receitas médicas e documentos de identificação apresentados pelos usuários',
    correctCategory: 'Insumo',
  },

  // Atividades (3)
  {
    id: 'item-atv-1',
    text: 'Conferência e triagem da receita médica quanto à legibilidade, posologia e validade',
    correctCategory: 'Atividade',
  },
  {
    id: 'item-atv-2',
    text: 'Separação física dos medicamentos prescritos nas prateleiras da farmácia',
    correctCategory: 'Atividade',
  },
  {
    id: 'item-atv-3',
    text: 'Baixa no estoque e registro do atendimento no sistema de gestão',
    correctCategory: 'Atividade',
  },

  // Produtos (3)
  {
    id: 'item-prd-1',
    text: 'Nº de receitas médicas atendidas na farmácia',
    correctCategory: 'Produto',
  },
  {
    id: 'item-prd-2',
    text: 'Nº de unidades e caixas de medicamentos entregues aos usuários',
    correctCategory: 'Produto',
  },
  {
    id: 'item-prd-3',
    text: 'Nº de orientações sobre uso e conservação prestadas no momento da entrega',
    correctCategory: 'Produto',
  },

  // Resultados (3)
  {
    id: 'item-res-1',
    text: 'Redução na ocorrência de erros de troca ou entrega incorreta de medicamentos',
    correctCategory: 'Resultado',
  },
  {
    id: 'item-res-2',
    text: 'Redução do tempo médio de espera dos usuários no atendimento da farmácia',
    correctCategory: 'Resultado',
  },
  {
    id: 'item-res-3',
    text: 'Aumento do percentual de receitas atendidas de forma integral',
    correctCategory: 'Resultado',
  },

  // Impactos (1)
  {
    id: 'item-imp-1',
    text: 'Garantia do acesso seguro e contínuo aos medicamentos essenciais na rede municipal',
    correctCategory: 'Impacto',
  },
];

/**
 * Utility to shuffle an array deterministically or pseudo-randomly
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
