import { useState } from "react";
import "../styles/Sidebar.css";
import { RuleInput } from "./ruleInput";
import { ImageInput } from "./nodeImageInput";

export function SideBar(props: any) {

  return (
    <div className="sidebar">
      <RuleInput />
      <ImageInput />
    </div>
  );
}
