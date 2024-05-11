import "../styles/Sidebar.css";
import React, { useEffect, useState } from "react";
import { RuleInput, RuleInputs } from "./ruleInput";
import { ImageInput } from "./nodeImageInput";
import { RuleComponent } from "./RuleComponent";
import { NodeInput } from "./NodeInput";
import { Rule } from "../concepts/Rule";
import { NodeImagesContext } from "../App";

export function SideBar(props: any) {
  const [rules, setRules] = useState<RuleInputs[]>([]);
  const [toggledRule, setToggledRule] = useState<Rule>();

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
      setToggledRule(rule);
    }, 
    [toggledRule]
  )

  const ctx = React.useContext(NodeImagesContext);
  const cy = ctx?.cy;
  if (cy !== undefined) {
    cy.on('tap', 'node', function(event) {
      if (toggledRule !== undefined) {
        const targetNode = event.target;
        console.log("CY EVENT")
        console.log(targetNode._private.data);
        console.log(ctx?.graph)
        // const newGraph = toggledRule.applyOne()
      }
    })
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
        {toggledRule?.left}
      </div>
    </div>
  );
}
