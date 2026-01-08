import React, { useMemo } from "react";
import { useMatrix } from "../context/MatrixContext";
import { MatrixCell } from "./MatrixCell";
import { calculateRowSum, calculatePercentile } from "../utils/calculations";
import "./MatrixTable.css";

export const MatrixTable: React.FC = () => {
  const { matrixData, addRow, removeRow, hoveredSumRow, setHoveredSumRow } =
    useMatrix();


  const rowSums = useMemo(() => {
    if (!matrixData) return [];
    return matrixData.cells.map((row) => calculateRowSum(row));
  }, [matrixData]);


  const columnPercentiles = useMemo(() => {
    if (!matrixData) return [];

    const percentiles: number[] = [];
    const { cells, n } = matrixData;

    for (let col = 0; col < n; col++) {
      const columnValues = cells.map((row) => row[col].amount);
      percentiles.push(calculatePercentile(columnValues, 60));
    }

    return percentiles;
  }, [matrixData]);


  if (!matrixData) return null;

  const { cells, n } = matrixData;

  return (
    <div className="matrix-table-container">
      <div className="table-wrapper">
        <table className="matrix-table">
          <thead>
            <tr>
              <th className="row-number-header">#</th>
              {Array.from({ length: n }, (_, i) => (
                <th key={i}>Col {i + 1}</th>
              ))}
              <th className="sum-header">Sum</th>
              <th className="actions-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cells.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="row-number">{rowIndex + 1}</td>
                {row.map((cell, colIndex) => (
                  <MatrixCell
                    key={cell.id}
                    cell={cell}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                  />
                ))}
                <td
                  className="sum-cell"
                  onMouseEnter={() => setHoveredSumRow(rowIndex)}
                  onMouseLeave={() => setHoveredSumRow(null)}
                >
                  {rowSums[rowIndex]}
                </td>
                <td className="actions-cell">
                  <button
                    className="delete-button"
                    onClick={() => removeRow(rowIndex)}
                    title="Delete row"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
            <tr className="percentile-row">
              <td className="row-number">60%</td>
              {columnPercentiles.map((percentile, colIndex) => (
                <td key={colIndex} className="percentile-cell">
                  {percentile.toFixed(1)}
                </td>
              ))}
              <td className="percentile-cell"></td>
              <td className="percentile-cell"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="table-controls">
        <button className="add-row-button" onClick={addRow}>
          + Add Row
        </button>
      </div>
    </div>
  );
};
