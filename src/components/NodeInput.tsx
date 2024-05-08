import React, { useContext, useState } from "react";
import "../styles/RuleInput.css";
import { NodeImagesContext } from "../App";

export function NodeInput(props: any) {
  const [nodeName, setNodeName] = useState("");

  // const ctx = useContext(NodeImagesContext);
  // const nodeTypes = ctx?.graph.copy()

  function handleNodeChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNodeName(e.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (nodeName === "") {
      return;
    }
    return;
  }

  return (
    <div className="ruleInputHeader">
      <form className="nodeInputForm" onSubmit={handleSubmit}>
        <label className="nodeInputInner">
          <h3>Add Node :</h3>
          <textarea
            className="smallerTextArea"
            value={nodeName}
            onChange={handleNodeChange}
          />
        </label>
        <button type="submit"> Submit! </button>
      </form>
    </div>
  );
}
