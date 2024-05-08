import React, { useState, useContext } from "react";
import { NodeImagesContext, ImageContextType } from '../App';
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
    // console.log(urlObj);
    ctx?.graph.setImage(urlObj.type, urlObj.url);
    ctx?.setKey(ctx?.key === 1 ? 0 : 1);
    // ctx?.setGraph(ctx?.graph);
  }

  return (
    <div className="nodeHeader">
        {nodeTypes.map((type: string) => {
          return(
            <div className="nodeBox">
                <h3> {type} </h3>
                {/* <h1> {type} </h1> */}
                <form>
                  <label>
                    Terminal?
                  </label>
                  <input type="checkbox">
                  </input>
                </form>
                  <UploadImage nodeType={type} getUpload={handleUpload}/>
            </div>
            )
        }
        )}
    </div>
  );
}
