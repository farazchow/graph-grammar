import React, { useState } from "react";
// import { createRuleFromString } from "../concepts/GraphStringParser";
// import { Rule } from "../concepts/Rule";
import "../styles/RuleInput.css";

export function RuleInput() {
  const [textArea, changeTextArea] = useState("");
  const [rules, changeRules] = useState<String[]>([]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    changeRules([...rules, textArea]);
    changeTextArea("");
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    changeTextArea(e.target.value);
  }

  return (
    <div className="header">
      <form className="inputForm" onSubmit={handleSubmit}>
        <label>
          <h1>Rule :</h1>
          <textarea value={textArea} onChange={handleChange} />
        </label>
        <button type="submit"> Submit! </button>
      </form>
      <p>{rules}</p>
    </div>
  );
}
