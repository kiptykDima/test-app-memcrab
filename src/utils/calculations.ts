import { Cell } from '../types';


export const calculateRowSum = (cells: Cell[]): number => {
  return cells.reduce((sum, cell) => sum + cell.amount, 0);
};


export const calculatePercentile = (values: number[], percentile: number): number => {
  if (values.length === 0) return 0;
  
  const sorted = [...values].sort((a, b) => a - b);
  const index = (percentile / 100) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const weight = index % 1;
  
  if (lower === upper) {
    return sorted[lower];
  }
  
  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
};


export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};


export const findNearestCells = (
  allCells: Cell[][],
  targetCell: { row: number; col: number },
  targetAmount: number,
  count: number
): number[] => {
  const cellsWithDistance: Array<{ cell: Cell; distance: number }> = [];
  

  allCells.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
 
      if (rowIndex === targetCell.row && colIndex === targetCell.col) {
        return;
      }
      
      const distance = Math.abs(cell.amount - targetAmount);
      cellsWithDistance.push({ cell, distance });
    });
  });
  

  cellsWithDistance.sort((a, b) => a.distance - b.distance);
  
  return cellsWithDistance.slice(0, count).map(item => item.cell.id);
};


export const getMaxInRow = (cells: Cell[]): number => {
  return Math.max(...cells.map(cell => cell.amount));
};
