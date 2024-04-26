import React from "react";
import "./App.css";
import { GraphVisual } from "./components/graphVisualizer";
import { RuleInput } from "./components/ruleInput";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <GraphVisual />
    </div>
  );
}

export default App;
