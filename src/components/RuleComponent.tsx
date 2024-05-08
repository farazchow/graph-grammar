import "../styles/RuleInput.css";
import { NodeImagesContext, ImageContextType } from "../App";
import { createRuleFromString } from "../concepts/GraphStringParser";
import React from "react";
import { Graph } from "../concepts/Graph";
import { Rule } from "../concepts/Rule";

export function RuleComponent(props: any) {
  const ctx = React.useContext(NodeImagesContext);

  function handleDelete() {
    props.handleDelete(props.id);
  }

  function handleApply() {
    const ruleData = props.RuleInput;
    const rule: Rule = createRuleFromString(
      ruleData.oldRoot,
      ruleData.newRoot,
      ruleData.graphString
    );

    const oldGraph = ctx?.graph;
    if (oldGraph !== undefined) {
      const newGraph: Graph = rule.applyAll(oldGraph);
      ctx?.setGraph(newGraph);
      // ctx?.setKey(ctx?.key === 1 ? 0 : 1);
    }
  }

  return (
    <div className="RuleComponent">
      <div className="RuleText">{props.RuleInput.graphString}</div>
      <button className="DeleteButton" onClick={handleApply}>
        Apply
      </button>
      <button className="DeleteButton" onClick={handleDelete}>
        X
      </button>
    </div>
  );
}
