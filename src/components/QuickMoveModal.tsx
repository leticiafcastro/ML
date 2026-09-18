import React from 'react';
import { CategoryId, CategoryInfo, ModelItem } from '../types';
import { X, ArrowRight } from 'lucide-react';

interface QuickMoveModalProps {
  item: ModelItem | null;
  categories: CategoryInfo[];
  onClose: () => void;
  onSelectCategory: (itemId: string, categoryId: CategoryId) => void;
}

export const QuickMoveModal: React.FC<QuickMoveModalProps> = ({
  item,
  categories,
  onClose,
  onSelectCategory,
}) => {
  if (!item) return null;

  return (
    <div
      id="quick-move-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="quick-move-modal-content"
        className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 p-5 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Posicionar Card
            </span>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
              Escolha a coluna de destino:
            </h3>
          </div>
          <button
            id="btn-close-quickmove-modal"
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 mb-4 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug">
          "{item.text}"
        </div>

        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`btn-select-cat-${cat.id.toLowerCase()}`}
              type="button"
              onClick={() => {
                onSelectCategory(item.id, cat.id);
                onClose();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 text-left transition-colors group"
            >
              <div>
                <span className={`text-xs sm:text-sm font-bold uppercase tracking-wide px-3 py-1 rounded-lg border ${cat.badgeColor}`}>
                  {cat.label}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-transform group-hover:translate-x-0.5 shrink-0 ml-2" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
