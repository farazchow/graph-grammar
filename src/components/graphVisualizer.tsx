import { Graph } from "../concepts/Graph";
import { GraphNode } from "../concepts/GraphNode";

import React from "react";
import CytoscapeComponent from "react-cytoscapejs";

const dummy = new Graph(new Map([[new GraphNode("a"), []]]));

export class GraphVisual extends React.Component {
  render() {
    const elts = dummy.cytoscapeify();
    console.log(elts);
    const style = [
      // the stylesheet for the graph
      {
        selector: "node[img]",
        style: {
          "background-image": "data(img)",
          "background-color": "#f00",
          label: "data(label)",
        },
      },
      {
        selector: "node",
        style: {
          "background-color": "#f00",
          label: "data(label)",
        },
      },
      {
        selector: "edge",
        style: {
          width: 3,
          "line-color": "#ccc",
          "target-arrow-shape": "none",
          "curve-style": "bezier",
        },
      },
    ];

    return (
      <CytoscapeComponent
        elements={CytoscapeComponent.normalizeElements(elts)}
        style={{ width: "600px", height: "600px" }}
        stylesheet={style}
      />
    );
  }
}
