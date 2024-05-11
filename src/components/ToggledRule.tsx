import "../styles/RuleInput.css";
import { NodeImagesContext, ImageContextType } from "../App";
import React from "react";
import { Rule } from "../concepts/Rule";
import { RuleVisual } from "./ruleVisualizer";
import { GraphNode } from "../concepts/GraphNode";
import { Graph } from "../concepts/Graph";

export function ToggledRule(props: any) {
  const ctx = React.useContext(NodeImagesContext);
  const rule: Rule = props.Rule;
  const ruleGraphRight: Graph = rule.applyAll(
    new Graph(new Map([[new GraphNode(rule.left), []]]))
  );
  ruleGraphRight.images = ctx?.graph.images ?? new Map();

  function handleDelete() {
    props.handleDelete();
  }

  return (
    <div className="RuleComponent">
      <div className="RuleText">
        {rule.left} &rarr; {rule.getRootLabel()}
      </div>
      <RuleVisual graph={ruleGraphRight} key={ctx?.key} />
      <button className="DeleteButton" onClick={handleDelete}>
        X
      </button>
    </div>
  );
}
