import { GraphNode } from "./GraphNode";
import { Graph } from "./Graph";

export class Rule {
  constructor(public left: GraphNode, private root: GraphNode, right: Graph) {}

  public applyOne(node: GraphNode, graph: Graph): Graph {
    throw new Error("Not implemented!");
  }

  public applyAll(graph: Graph): Graph {
    throw new Error("Not implemented!");
  }
}
