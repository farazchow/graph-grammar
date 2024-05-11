import "../styles/Sidebar.css";
import React, { useEffect, useState } from "react";
import { RuleInput, RuleInputs } from "./ruleInput";
import { ImageInput } from "./nodeImageInput";
import { RuleComponent } from "./RuleComponent";
import { NodeInput } from "./NodeInput";
import { Rule } from "../concepts/Rule";
import { NodeImagesContext } from "../App";
import { ToggledRule } from "./ToggledRule";

export function SideBar(props: any) {
  const [rules, setRules] = useState<RuleInputs[]>([]);
  const [toggledRule, setToggledRule] = useState<Rule>();
  const ctx = React.useContext(NodeImagesContext);
  const cy = ctx?.cy;

  const handleSubmit = React.useCallback(
    (newRule: RuleInputs) => {
      setRules([...rules, newRule]);
    },
    [rules]
  );

  const handleDelete = React.useCallback(
    (id: number) => {
      function checkId(value: RuleInputs, index: number) {
        return index !== id;
      }
      setRules(rules.filter(checkId));
    },
    [rules]
  );

  const handleApplyOne = React.useCallback(
    (rule: Rule) => {
      cy?.removeAllListeners();
      setToggledRule(rule);
      // ctx?.setKey(ctx?.key === 1 ? 0 : 1);
    },
    [cy]
  );
  const handleUntoggle = React.useCallback(() => {
    cy?.removeAllListeners();
    setToggledRule(undefined);
    // ctx?.setKey(ctx?.key === 1 ? 0 : 1);
  }, [cy]);

  if (cy !== undefined) {
    cy.on("tap", "node", function (event) {
      if (toggledRule !== undefined) {
        const targetNode = event.target;
        const oldGraph = ctx?.graph;
        const nodeToReplaceData = targetNode._private.data;
        if (nodeToReplaceData.label === toggledRule.left) {
          const nodeToReplace = ctx?.graph.findNodeById(nodeToReplaceData.id);

          if (nodeToReplace === undefined) {
            throw new Error("Couldn't find node");
          }
          if (oldGraph === undefined) {
            throw new Error("Trying to apply rules to no graph");
          }

          const newGraph = toggledRule.applyOne(nodeToReplace, oldGraph);
          ctx?.setGraph(newGraph);
          ctx?.setKey(ctx?.key === 1 ? 0 : 1);
        } else {
          console.log("Can't apply rule to this node");
        }
      }
    });
  }

  return (
    <div className="sidebar">
      <RuleInput onSubmit={handleSubmit} />
      {/* <hr></hr> */}
      {/* <NodeInput /> */}
      <hr></hr>
      <ImageInput />
      <hr></hr>
      <div className="RuleContainer">
        <h3>Rules:</h3>
        {rules.map((value: RuleInputs, index: number) => {
          return (
            <RuleComponent
              key={index}
              RuleInput={value}
              id={index}
              handleDelete={handleDelete}
              handleApplyOne={handleApplyOne}
            />
          );
        })}
        <h3>Toggled Rule</h3>
        {toggledRule && (
          <ToggledRule Rule={toggledRule} handleDelete={handleUntoggle} />
        )}
      </div>
    </div>
  );
}
