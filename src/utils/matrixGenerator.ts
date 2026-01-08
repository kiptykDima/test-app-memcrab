import { Cell } from '../types';

let currentId = 0;


export const generateUniqueId = (): number => {
  return currentId++;
};

export const resetIdCounter = (): void => {
  currentId = 0;
};


export const generateRandomAmount = (): number => {
  return Math.floor(Math.random() * 900) + 100;
};


export const createMatrix = (m: number, n: number): Cell[][] => {
  const matrix: Cell[][] = [];
  
  for (let row = 0; row < m; row++) {
    const rowCells: Cell[] = [];
    
    for (let col = 0; col < n; col++) {
      rowCells.push({
        id: generateUniqueId(),
        amount: generateRandomAmount()
      });
    }
    
    matrix.push(rowCells);
  }
  
  return matrix;
};


export const createNewRow = (n: number): Cell[] => {
  const row: Cell[] = [];
  
  for (let col = 0; col < n; col++) {
    row.push({
      id: generateUniqueId(),
      amount: generateRandomAmount()
    });
  }
  
  return row;
};
