import { GraphNode } from "./GraphNode";
import { Graph } from "./Graph";

export class Rule {
  constructor(public left: string, private root: GraphNode, public right: Graph) {}

  public applyOne(node: GraphNode, graph: Graph): Graph {
    throw new Error("Not implemented!");
  }

  public applyAll(graph: Graph): Graph {
    const newGraph = graph.replaceVerticesWithLabel(this.left, this.root, this.right);
    return newGraph;
  }
}
