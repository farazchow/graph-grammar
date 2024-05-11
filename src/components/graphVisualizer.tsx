import { Graph } from "../concepts/Graph";
import cytoscape from "cytoscape";
// @ts-ignore
import cola from "cytoscape-cola";
import React from "react";
import CytoscapeComponent from "react-cytoscapejs";

interface CustomInputProps {
  graph: Graph;
  setCy: (cy: cytoscape.Core) => void;
}

cytoscape.use(cola);

export class GraphVisual extends React.Component<CustomInputProps> {
  render() {
    const elts = this.props.graph.cytoscapeify();
    const width = window.innerWidth * 0.7;
    const height = window.innerHeight * 0.95;

    const style = [
      // the stylesheet for the graph
      {
        selector: "node[img]",
        style: {
          "background-image": "data(img)",
          "background-color": "#f00",
          "background-fit": "contain",
          "background-opacity": "0",
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
          width: width,
          height: height,
          borderColor: "black",
          borderStyle: "solid",
          textAlign: "left",
        }}
        layout={{ name: "cola" }}
        // layout={{ name: "grid", rows: 8, cols: 11}}
        // layout= {{name: "random"}}
        stylesheet={style}
        cy={(cy) => {
          this.props.setCy(cy);
        }}
      />
    );
  }
}
