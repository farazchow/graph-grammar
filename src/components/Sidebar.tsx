import { useState } from "react";
import "../styles/Sidebar.css";
import { RuleInput } from "./ruleInput";

export function SideBar() {
  return (
    <div className="sidebar">
      <RuleInput />
    </div>
  );
}
