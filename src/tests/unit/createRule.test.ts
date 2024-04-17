import { GraphNode } from "../../concepts/GraphNode";
import { Graph } from "../../concepts/Graph";
import { Rule } from "../../concepts/Rule";
import { createRuleFromString } from "../../concepts/GraphStringParser";

describe("test createRuleFromString", () => {
  test("[(d_1, b_1), (b_1, c_1), (c_1, b_2)]", () => {
    const testString = "[(d_1, b_1), (b_1, c_1), (c_1, b_2)]";
    const oldRoot = "a";
    const newRoot = "b";

    const rule: Rule = createRuleFromString(oldRoot, newRoot, testString);

    const b_1 = new GraphNode("b");
    const b_2 = new GraphNode("b");
    const c_1 = new GraphNode("c");
    const d_1 = new GraphNode("d");

    const adjacencyMatrix = new Map();
    adjacencyMatrix.set(b_1, new Set([d_1, c_1]));
    adjacencyMatrix.set(b_2, new Set([c_1]));
    adjacencyMatrix.set(c_1, new Set([b_2, b_1]));
    adjacencyMatrix.set(d_1, new Set([b_1]));
    const graph = new Graph(adjacencyMatrix);
    expect(graph.isEqual(rule.right)).toBe(true);
  });
});
