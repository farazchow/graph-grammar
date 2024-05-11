import "../styles/RuleInput.css";
import { NodeImagesContext, ImageContextType } from "../App";
import { createRuleFromString } from "../concepts/GraphStringParser";
import React from "react";
import { Graph } from "../concepts/Graph";
import { GraphNode } from "../concepts/GraphNode";
import { Rule } from "../concepts/Rule";
import { RuleVisual } from "./ruleVisualizer";

export function RuleComponent(props: any) {
  const ctx = React.useContext(NodeImagesContext);

  const ruleData = props.RuleInput;
  const rule: Rule = createRuleFromString(
    ruleData.oldRoot,
    ruleData.newRoot,
    ruleData.graphString
  );
  const ruleGraphRight: Graph = rule.applyAll(
    new Graph(new Map([[new GraphNode(ruleData.oldRoot), []]]))
  );
  ruleGraphRight.images = ctx?.graph.images ?? new Map();

  function handleDelete() {
    props.handleDelete(props.id);
  }

  function handleApplyOne() {
    const ruleData = props.RuleInput;
    const rule: Rule = createRuleFromString(
      ruleData.oldRoot,
      ruleData.newRoot,
      ruleData.graphString
    );

    props.handleApplyOne(rule);
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
      ctx?.setKey(ctx?.key === 1 ? 0 : 1);
    }
  }

  return (
    <div className="RuleComponent">
      <div className="RuleText">
        {props.RuleInput.oldRoot} &rarr; {props.RuleInput.newRoot}
      </div>
      <RuleVisual graph={ruleGraphRight} key={ctx?.key}/>
      {/* <div className="RuleText">{props.RuleInput.graphString}</div> */}
      <button className="DeleteButton" onClick={handleApply}>
        Apply All
      </button>
      <button className="DeleteButton" onClick={handleApplyOne}>
        Apply One
      </button>
      <button className="DeleteButton" onClick={handleDelete}>
        X
      </button>
    </div>
  );
}
