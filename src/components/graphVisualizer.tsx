import { Graph } from "../concepts/Graph";

import React from "react";
import CytoscapeComponent from "react-cytoscapejs";

interface CustomInputProps {
  graph: Graph;
}

export class GraphVisual extends React.Component<CustomInputProps> {
  render() {
    const elts = this.props.graph.cytoscapeify();
    const style = [
      // the stylesheet for the graph
      {
        selector: "node[img]",
        style: {
          "background-image": "data(img)",
          "background-color": "#f00",
          label: "data(label)",
          shape: "rectangle",
          width: "75px",
          height: "75px",
        },
      },
      {
        selector: "node",
        style: {
          "background-color": "#f00",
          label: "data(label)",
          shape: "rectangle",
          width: "75px",
          height: "75px",
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
        style={{
          width: "700px",
          height: "500px",
          borderColor: "black",
          borderStyle: "solid",
          textAlign: "left",
        }}
        stylesheet={style}
      />
    );
  }
}
