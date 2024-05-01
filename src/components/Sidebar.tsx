import { useState } from "react";
import "../styles/Sidebar.css";
import { RuleInput } from "./ruleInput";
import { ImageInput } from "./nodeImageInput";

export function SideBar() {
  return (
    <div className="sidebar">
      <RuleInput />
      <ImageInput nodeTypes={["a", "b"]}/>
    </div>
  );
}
