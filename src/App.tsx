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
  const [graphHistory, setGraphHistory] = useState<Graph[]>([]);

  const handleGraphUpdate = (g: Graph) => {
    const oldGraph = graph;
    setGraph(g);
    setGraphHistory([...graphHistory, oldGraph]);
  };

  const undo = () => {
    const graphHistoryCopy = [...graphHistory];
    const newGraph = graphHistoryCopy.pop();
    if (newGraph !== undefined) {
      setGraph(newGraph);
      setGraphHistory(graphHistoryCopy);
      setKey(key === 1 ? 0 : 1);
    }
  };

  return (
    <div className="App">
      <NodeImagesContext.Provider
        value={{
          graph,
          key,
          cy,
          setKey,
          setGraph: handleGraphUpdate,
          setCy,
        }}
      >
        <header className="App-header">
          <SideBar handleUndo={undo} />
          <GraphVisual graph={graph} key={key} setCy={setCy} />
        </header>
      </NodeImagesContext.Provider>
    </div>
  );
}

export default App;
