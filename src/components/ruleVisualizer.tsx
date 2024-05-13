import { Graph } from "../concepts/Graph";
import cytoscape from "cytoscape";
import React from "react";
import CytoscapeComponent from "react-cytoscapejs";

interface CustomInputProps {
  graph: Graph;
}

export class RuleVisual extends React.Component<CustomInputProps> {
  setCy = (cy: cytoscape.Core) => {
    cy.layout({ name: "breadthfirst" }).run();
    cy.fit();
  };

  render() {
    const elts = this.props.graph.cytoscapeify();
    
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
        stylesheet={style}
        cy={this.setCy}
        userPanningEnabled={false}
        userZoomingEnabled={false}
        autoungrabify={true}
        autounselectify={true}
      />
    );
  }
}
