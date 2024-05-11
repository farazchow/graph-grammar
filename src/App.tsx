import React, { useState } from "react";
import "./App.css";
import { GraphVisual } from "./components/graphVisualizer";
import { SideBar } from "./components/Sidebar";
import { Graph } from "./concepts/Graph";
import { GraphNode } from "./concepts/GraphNode";
import cytoscape from "cytoscape";

// @types.todo.ts
export type ImageContextType = {
  graph: Graph;
  key: number;
  cy: cytoscape.Core | undefined;
  setKey: (k: number) => void;
  setGraph: (g: Graph) => void;
  setCy: (cy: cytoscape.Core) => void;
};

export const NodeImagesContext = React.createContext<ImageContextType | null>(
  null
);

function App() {
  const [graph, setGraph] = useState(
    new Graph(new Map([[new GraphNode("s"), []]]))
  );
  const [cy, setCy] = useState<cytoscape.Core>();
  const [key, setKey] = useState(0);

  return (
    <div className="App">
      <NodeImagesContext.Provider
        value={{ graph, key, cy, setKey, setGraph, setCy }}
      >
        <header className="App-header">
          <SideBar />
          <GraphVisual graph={graph} key={key} setCy={setCy} />
        </header>
      </NodeImagesContext.Provider>
    </div>
  );
}

export default App;
