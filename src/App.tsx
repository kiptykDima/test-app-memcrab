import React from "react";
import { MatrixProvider } from "./context/MatrixProvider";
import { useMatrix } from "./context/MatrixContext";
import { InputForm } from "./components/InputForm";
import { MatrixTable } from "./components/MatrixTable";
import "./App.css";

function AppContent() {
  const { matrixData } = useMatrix();

  return (
    <div className="App">
      <InputForm />
      {matrixData && <MatrixTable />}
    </div>
  );
}

function App() {
  return (
    <MatrixProvider>
      <AppContent />
    </MatrixProvider>
  );
}

export default App;
