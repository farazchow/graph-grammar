import React, { useState } from "react";
import "../styles/RuleInput.css";

export interface RuleInputs {
  oldRoot: string;
  newRoot: string;
  graphString: string;
}

export function RuleInput(props: any) {
  const [oldRoot, setOldRoot] = useState("");
  const [newRoot, setNewRoot] = useState("");
  const [graphString, setGraphString] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (oldRoot === "" || newRoot === "" || graphString === "") {
      return;
    }

    const newRuleInput: RuleInputs = {
      oldRoot: oldRoot,
      newRoot: newRoot,
      graphString: graphString,
    };
    props.onSubmit(newRuleInput);
    setOldRoot("");
    setNewRoot("");
    setGraphString("");
  }

  function handleOldRootChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setOldRoot(e.target.value);
  }
  function handleNewRootChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNewRoot(e.target.value);
  }
  function handleGraphStringChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setGraphString(e.target.value);
  }

  return (
    <div className="ruleInputHeader">
      <form className="inputForm" onSubmit={handleSubmit}>
        <h3>Add Rule :</h3>
        <label>
          Old Root: 
          <textarea className="smallerTextArea" value={oldRoot} onChange={handleOldRootChange} />
        </label>
        <label>
          New root: 
          <textarea className="smallerTextArea" value={newRoot} onChange={handleNewRootChange} />
        </label>
        <label>
          Graph String:
          <textarea
            className="ruleTextArea"
            value={graphString}
            onChange={handleGraphStringChange}
          />
        </label>
        <button type="submit"> Submit! </button>
      </form>
    </div>
  );
}
