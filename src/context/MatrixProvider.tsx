import React, { useState, useCallback, ReactNode } from "react";
import { MatrixContext } from "./MatrixContext";
import { MatrixData } from "../types";
import {
  createMatrix,
  createNewRow,
  resetIdCounter,
} from "../utils/matrixGenerator";

interface MatrixProviderProps {
  children: ReactNode;
}

export const MatrixProvider: React.FC<MatrixProviderProps> = ({ children }) => {
  const [matrixData, setMatrixData] = useState<MatrixData | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [hoveredSumRow, setHoveredSumRow] = useState<number | null>(null);

  const generateMatrix = useCallback((m: number, n: number, x: number) => {
    resetIdCounter();
    const cells = createMatrix(m, n);
    setMatrixData({ cells, m, n, x });
    setHoveredCell(null);
    setHoveredSumRow(null);
  }, []);

  const incrementCell = useCallback(
    (rowIndex: number, colIndex: number) => {
      if (!matrixData) return;

      const newCells = matrixData.cells.map((row, rIdx) =>
        row.map((cell, cIdx) => {
          if (rIdx === rowIndex && cIdx === colIndex) {
            return { ...cell, amount: cell.amount + 1 };
          }
          return cell;
        })
      );

      setMatrixData({ ...matrixData, cells: newCells });
    },
    [matrixData]
  );

  const addRow = useCallback(() => {
    if (!matrixData) return;

    const newRow = createNewRow(matrixData.n);
    const newCells = [...matrixData.cells, newRow];

    setMatrixData({
      ...matrixData,
      cells: newCells,
      m: matrixData.m + 1,
    });
  }, [matrixData]);

  const removeRow = useCallback(
    (rowIndex: number) => {
      if (!matrixData || matrixData.m <= 1) return;

      const newCells = matrixData.cells.filter((_, idx) => idx !== rowIndex);

      setMatrixData({
        ...matrixData,
        cells: newCells,
        m: matrixData.m - 1,
      });


      if (hoveredSumRow === rowIndex) {
        setHoveredSumRow(null);
      }
    },
    [matrixData, hoveredSumRow]
  );

  const value = {
    matrixData,
    generateMatrix,
    incrementCell,
    addRow,
    removeRow,
    hoveredCell,
    setHoveredCell,
    hoveredSumRow,
    setHoveredSumRow,
  };

  return (
    <MatrixContext.Provider value={value}>{children}</MatrixContext.Provider>
  );
};
