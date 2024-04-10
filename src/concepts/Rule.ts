import { GraphNode } from "./GraphNode";
import { Graph } from "./Graph";

export class Rule {
  constructor(
    public left: GraphNode,
    private root: GraphNode[],
    right: Graph[],
    probability: Array<number>
  ) {
    if (root.length !== right.length && root.length !== probability.length) {
      throw new Error(
        "Length of root != Length of right != Length of probability"
      );
    }
    if (probability.reduce((partialSum, a) => partialSum + a, 0) !== 1) {
      throw new Error("Probabilities do not add up to 1");
    }
  }

  public applyOne(node: GraphNode, graph: Graph): Graph {
    throw new Error("Not implemented!");
  }

  public applyAll(graph: Graph): Graph {
    throw new Error("Not implemented!");
  }
}
