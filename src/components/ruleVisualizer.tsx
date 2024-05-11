import { Graph } from "../concepts/Graph";
import cytoscape from "cytoscape";
// @ts-ignore
import cola from "cytoscape-cola";
import React from "react";
import CytoscapeComponent from "react-cytoscapejs";

interface CustomInputProps {
  graph: Graph;
}

cytoscape.use(cola);

export class RuleVisual extends React.Component<CustomInputProps> {
  render() {
    const elts = this.props.graph.cytoscapeify();

    const layout = { name: "breadthfirst" };
    
    const style = [
      // the stylesheet for the graph
      {
        selector: "node[img]",
        style: {
          "background-image": "data(img)",
          "background-color": "#f00",
          "background-fit": "contain",
          "background-opacity": "0",
          "font-size": "50px",
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
          "font-size": "50px",
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
          width: "100px",
          height: "100px",
          textAlign: "left",
        }}
        layout={layout}
        stylesheet={style}
        cy={(cy) => { cy.layout(layout); cy.fit() }}
        userPanningEnabled={false}
        userZoomingEnabled={false}
        autoungrabify={true}
        autounselectify={true}
      />
    );
  }
}
