import React from "react";
import "./App.css";
import { GraphVisual } from "./components/graphVisualizer";
import { RuleInput } from "./components/ruleInput";
import { SideBar } from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SideBar />
      </header>
      <GraphVisual />
    </div>
  );
}

export default App;
