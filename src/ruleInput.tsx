import React, { Component } from "react";
import { createRuleFromString } from "./concepts/GraphStringParser";
import { Rule } from "./concepts/Rule";

interface IProps {}

interface IState {
  textValue: string;
  rules: string[];
}

export class RuleInput extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      textValue: "",
      rules: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ textValue: event.target.value });
  }
  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    this.state.rules.push(this.state.textValue);
    this.setState({ textValue: "" });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Rule:
            <input
              type="text"
              value={this.state.textValue}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p>{this.state.rules}</p>
      </div>
    );
  }
}
