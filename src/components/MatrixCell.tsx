import React, { useMemo } from "react";
import { useMatrix } from "../context/MatrixContext";
import { Cell } from "../types";
import {
  findNearestCells,
  calculatePercentage,
  getMaxInRow,
  calculateRowSum,
} from "../utils/calculations";

interface MatrixCellProps {
  cell: Cell;
  rowIndex: number;
  colIndex: number;
}

export const MatrixCell: React.FC<MatrixCellProps> = ({
  cell,
  rowIndex,
  colIndex,
}) => {
  const {
    matrixData,
    incrementCell,
    hoveredCell,
    setHoveredCell,
    hoveredSumRow,
  } = useMatrix();


  const isHighlighted = useMemo(() => {
    if (!matrixData || !hoveredCell) return false;

    const { cells, x } = matrixData;
    const nearestIds = findNearestCells(
      cells,
      hoveredCell,
      cells[hoveredCell.row][hoveredCell.col].amount,
      x
    );

    return nearestIds.includes(cell.id);
  }, [hoveredCell, matrixData, cell.id]);


  const showPercentage = hoveredSumRow === rowIndex;


  const { displayValue, heatmapIntensity } = useMemo(() => {
    if (!matrixData) {
      return {
        displayValue: cell.amount.toString(),
        heatmapIntensity: 0,
      };
    }

    const { cells } = matrixData;

    if (showPercentage) {
      const rowCells = cells[rowIndex];
      const rowSum = calculateRowSum(rowCells);
      const percentage = calculatePercentage(cell.amount, rowSum);
      const maxInRow = getMaxInRow(rowCells);
      const intensity = maxInRow > 0 ? (cell.amount / maxInRow) * 100 : 0;

      return {
        displayValue: `${percentage}%`,
        heatmapIntensity: intensity,
      };
    }

    return {
      displayValue: cell.amount.toString(),
      heatmapIntensity: 0,
    };
  }, [showPercentage, matrixData, rowIndex, cell.amount]);


  if (!matrixData) return null;

  const handleClick = () => {
    incrementCell(rowIndex, colIndex);
  };

  const handleMouseEnter = () => {
    setHoveredCell({ row: rowIndex, col: colIndex });
  };

  const handleMouseLeave = () => {
    setHoveredCell(null);
  };

  const cellStyle: React.CSSProperties = showPercentage
    ? {
        background: `linear-gradient(to right, rgba(102, 126, 234, ${
          heatmapIntensity / 100
        }) ${heatmapIntensity}%, transparent ${heatmapIntensity}%)`,
      }
    : {};

  return (
    <td
      className={`matrix-cell ${isHighlighted ? "highlighted" : ""} ${
        showPercentage ? "percentage-mode" : ""
      }`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={cellStyle}
    >
      {displayValue}
    </td>
  );
};
