import React, { useState, useContext } from "react";
import { NodeImagesContext, ImageContextType } from '../App';
// import { createRuleFromString } from "../concepts/GraphStringParser";
// import { Rule } from "../concepts/Rule";
import "../styles/RuleInput.css";
import UploadImage from "./imageUpload";

export interface ImageURL {
    type: string,
    url: string
}

export function ImageInput(props: any) {
  const ctx  = useContext(NodeImagesContext);
  const nodeTypes = ctx?.graph.getNodeTypes() ?? [];

  const handleUpload = (urlObj: ImageURL) => {
    console.log(urlObj);
    ctx?.graph.setImage(urlObj.type, urlObj.url);
    ctx?.setKey(ctx?.key === 1 ? 0 : 1 );
  }

  return (
    <div className="header">
        {nodeTypes.map((type: string) => (
        <li key={type}>
            <p>Node: {type} </p>
            <UploadImage nodeType={type} getUpload={handleUpload}/>
        </li>
        ))}
    </div>
  );
}
