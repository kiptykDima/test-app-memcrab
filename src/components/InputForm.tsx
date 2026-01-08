import React, { useState, FormEvent } from "react";
import { useMatrix } from "../context/MatrixContext";
import "./InputForm.css";

export const InputForm: React.FC = () => {
  const { generateMatrix, matrixData } = useMatrix();
  const [m, setM] = useState<string>("5");
  const [n, setN] = useState<string>("5");
  const [x, setX] = useState<string>("5");
  const [errors, setErrors] = useState<{ m?: string; n?: string; x?: string }>(
    {}
  );

  const validateInputs = (): boolean => {
    const newErrors: { m?: string; n?: string; x?: string } = {};

    const mNum = parseInt(m);
    const nNum = parseInt(n);
    const xNum = parseInt(x);

    // Validate M
    if (isNaN(mNum) || mNum < 0 || mNum > 100) {
      newErrors.m = "M must be between 0 and 100";
    }

    // Validate N
    if (isNaN(nNum) || nNum < 0 || nNum > 100) {
      newErrors.n = "N must be between 0 and 100";
    }

    // Validate X
    if (!isNaN(mNum) && !isNaN(nNum) && mNum > 0 && nNum > 0) {
      const maxX = mNum * nNum;
      if (isNaN(xNum) || xNum < 0 || xNum >= maxX) {
        newErrors.x = `X must be between 0 and ${maxX - 1}`;
      }
    } else if (isNaN(xNum) || xNum < 0) {
      newErrors.x = "X must be a non-negative number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateInputs()) {
      const mNum = parseInt(m);
      const nNum = parseInt(n);
      const xNum = parseInt(x);

      generateMatrix(mNum, nNum, xNum);
    }
  };

  return (
    <div className="input-form-container">
      <h1>Interactive Matrix Table</h1>
      <form onSubmit={handleSubmit} className="input-form">
        <div className="form-group">
          <label htmlFor="m-input">
            M (Rows):
            <span className="input-hint">0-100</span>
          </label>
          <input
            id="m-input"
            type="number"
            value={m}
            onChange={(e) => setM(e.target.value)}
            className={errors.m ? "error" : ""}
            min="0"
            max="100"
          />
          {errors.m && <span className="error-message">{errors.m}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="n-input">
            N (Columns):
            <span className="input-hint">0-100</span>
          </label>
          <input
            id="n-input"
            type="number"
            value={n}
            onChange={(e) => setN(e.target.value)}
            className={errors.n ? "error" : ""}
            min="0"
            max="100"
          />
          {errors.n && <span className="error-message">{errors.n}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="x-input">
            X (Nearest cells):
            <span className="input-hint">
              {m && n && parseInt(m) > 0 && parseInt(n) > 0
                ? `0-${parseInt(m) * parseInt(n) - 1}`
                : "0-?"}
            </span>
          </label>
          <input
            id="x-input"
            type="number"
            value={x}
            onChange={(e) => setX(e.target.value)}
            className={errors.x ? "error" : ""}
            min="0"
          />
          {errors.x && <span className="error-message">{errors.x}</span>}
        </div>

        <button type="submit" className="generate-button">
          {matrixData ? "Regenerate Matrix" : "Generate Matrix"}
        </button>
      </form>
    </div>
  );
};
