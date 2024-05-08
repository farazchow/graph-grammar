import "../styles/RuleInput.css";
import React from "react";

export function RuleComponent(props: any) {
  function handleDelete() {
    props.handleDelete(props.id);
  }

  return (
    <div className="RuleComponent">
      <div className="RuleText">{props.RuleInput.graphString}</div>
      <button className="DeleteButton" onClick={handleDelete}>
        X
      </button>
    </div>
  );
}
