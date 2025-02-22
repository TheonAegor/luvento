import { CSSProperties } from 'react';

export const SIZES = {
    /** Ширина одной ячейки календаря в пикселях */
    CELL_WIDTH: 48,
    
    /** Ширина колонки с названием квартиры в пикселях */
    APARTMENT_COLUMN_WIDTH: 150,
    
    /** Отступы ячейки */
    CELL_PADDING: {
        VERTICAL: 8,
        HORIZONTAL: 4
    }
} as const;

// CSS переменные для использования в стилях
export const CSS_VARS: CSSProperties = {
    '--cell-width': `${SIZES.CELL_WIDTH}px`,
    '--apartment-column-width': `${SIZES.APARTMENT_COLUMN_WIDTH}px`,
    '--cell-padding': `${SIZES.CELL_PADDING.VERTICAL}px ${SIZES.CELL_PADDING.HORIZONTAL}px`,
} as CSSProperties; 