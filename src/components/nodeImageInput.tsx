import React, { useState } from "react";
// import { createRuleFromString } from "../concepts/GraphStringParser";
// import { Rule } from "../concepts/Rule";
import "../styles/RuleInput.css";
import UploadImage from "./imageUpload";

export function ImageInput(props: any) {
  const [textArea, changeTextArea] = useState("");
  const [rules, changeRules] = useState<String[]>([]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    changeRules([...rules, textArea]);
    changeTextArea("");
  }

  return (
    <div className="header">
        {props.nodeTypes.map((type: string) => (
        <li>
            <p>Node: {type} </p>
            <UploadImage/>
        </li>
        ))}
    </div>
  );
}
