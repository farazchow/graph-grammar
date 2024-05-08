import "../styles/Sidebar.css";
import React, { useEffect, useState } from "react";
import { RuleInput, RuleInputs } from "./ruleInput";
import { ImageInput } from "./nodeImageInput";
import { RuleComponent } from "./RuleComponent";

export function SideBar(props: any) {
  const [rules, setRules] = useState<RuleInputs[]>([]);

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

  useEffect(() => {
    console.log(rules);
  });

  return (
    <div className="sidebar">
      <RuleInput onSubmit={handleSubmit} />
      <ImageInput />
      <div>
        Rules:
        {rules.map((value: RuleInputs, index: number) => {
          return (
            <RuleComponent
              key={index}
              RuleInput={value}
              id={index}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </div>
  );
}
