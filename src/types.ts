export type CategoryId = 'Insumo' | 'Atividade' | 'Produto' | 'Resultado' | 'Impacto';

export interface CategoryInfo {
  id: CategoryId;
  label: string;
  badgeColor: string;
  borderColor: string;
  lightBg: string;
  headerBg: string;
  totalItems: number;
}

export interface ModelItem {
  id: string;
  text: string;
  correctCategory: CategoryId;
}

export type PlacedItemsState = Record<string, CategoryId | 'pool'>;

export interface GameEvaluation {
  total: number;
  correctCount: number;
  isPerfect: boolean;
  itemResults: Record<string, boolean>; // itemId -> isCorrect
}
