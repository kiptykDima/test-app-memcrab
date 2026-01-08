import { createContext, useContext } from "react";
import { MatrixContextType } from "../types";

export const MatrixContext = createContext<MatrixContextType | undefined>(
  undefined
);

export const useMatrix = () => {
  const context = useContext(MatrixContext);
  if (!context) {
    throw new Error("useMatrix must be used within a MatrixProvider");
  }
  return context;
};
