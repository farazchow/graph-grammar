import { GraphNode } from "./GraphNode";
import { Graph } from "./Graph";

export class Rule {
  constructor(
    public left: string,
    private root: GraphNode,
    public right: Graph
  ) {}

  public applyOne(node: GraphNode, graph: Graph): Graph {
    if (node.label !== this.left) {
      throw new Error("Node to replace is not of correct type!");
    }
    const newGraph = graph.replaceVertex(node, this.root, this.right);
    return newGraph;
  }

  public applyAll(graph: Graph): Graph {
    const newGraph = graph.replaceVerticesWithLabel(
      this.left,
      this.root,
      this.right
    );
    return newGraph;
  }

  public getRootLabel(): string {
    return this.root.label;
  }
}
