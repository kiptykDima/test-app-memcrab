export type CellId = number;
export type CellValue = number;

export interface Cell {
  id: CellId;
  amount: CellValue;
}

export interface MatrixData {
  cells: Cell[][];
  m: number;
  n: number; 
  x: number;
}

export interface MatrixContextType {
  matrixData: MatrixData | null;
  generateMatrix: (m: number, n: number, x: number) => void;
  incrementCell: (rowIndex: number, colIndex: number) => void;
  addRow: () => void;
  removeRow: (rowIndex: number) => void;
  hoveredCell: { row: number; col: number } | null;
  setHoveredCell: (cell: { row: number; col: number } | null) => void;
  hoveredSumRow: number | null;
  setHoveredSumRow: (rowIndex: number | null) => void;
}
