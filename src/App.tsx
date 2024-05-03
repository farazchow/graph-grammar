import React, { useState } from "react";
import "./App.css";
import { GraphVisual } from "./components/graphVisualizer";
import { RuleInput } from "./components/ruleInput";
import { SideBar } from "./components/Sidebar";
import { Graph } from './concepts/Graph'
import { GraphNode } from './concepts/GraphNode';
import { createContext } from "vm";

// @types.todo.ts
export type ImageContextType = {
  graph: Graph;
  key: number;
  setKey: (key: number) => void;
};

export const NodeImagesContext = React.createContext<ImageContextType | null>(null);

function App() {

  const [graph, setGraph] = useState(new Graph(new Map([
    [new GraphNode("s"), []]
  ])));
  const [key, setKey] = useState(0);

  return (
    <div className="App">
      <NodeImagesContext.Provider value={{graph: graph, key: key, setKey: setKey}}>
        <header className="App-header">
          <SideBar />
        </header>
        <GraphVisual graph={graph} key={key}/>
      </NodeImagesContext.Provider>
    </div>
  );
}

export default App;
