import { Rule } from "./Rule";
import { GraphNode } from "./GraphNode";
import { Graph } from "./Graph";

/**
 * Creates a rule object from a given nodeMap, old root, new root, and graphString.
 *
 * @param oldRoot Label for old root in rule
 * @param newRoot Label for new root in rule
 * @param graphString String that represents edges in a graph
 * @returns
 */
function createRuleFromString(
  oldRoot: string,
  newRoot: string,
  graphString: string
) {
  let rightNode = new GraphNode(newRoot);

  graphString = graphString.trim().slice(1, -1);
  const allNodeStrings = graphString
    .split(/\(|\)|\s|,/)
    .filter((value: string) => value !== "");

  // Create instances for all unique nodes
  const nodeInstances: Map<String, GraphNode> = new Map<String, GraphNode>();
  nodeInstances.set(`${newRoot}_1`, rightNode);
  for (let nodeString of allNodeStrings) {
    if (nodeInstances.has(nodeString)) {
      continue;
    }

    const parsedNode = nodeString.split("_")[0];
    const nodeInstance = new GraphNode(parsedNode);
    nodeInstances.set(nodeString, nodeInstance);
  }

  // Create Adjacency Matrix out of edges
  let adjacencyMatrix = new Map<GraphNode, Set<GraphNode>>();
  for (var i = 0; i < allNodeStrings.length; i += 2) {
    let leftNeighbor = nodeInstances.get(allNodeStrings[i]);
    let rightNeighbor = nodeInstances.get(allNodeStrings[i + 1]);

    if (leftNeighbor === undefined || rightNeighbor === undefined) {
      throw new TypeError("Didn't create Node Instances properly");
    }

    // Add nodes to adjacency matrix forwards and backwards
    if (adjacencyMatrix.has(leftNeighbor)) {
      adjacencyMatrix.get(leftNeighbor)!.add(rightNeighbor);
    } else {
      adjacencyMatrix.set(leftNeighbor, new Set([rightNeighbor]));
    }
    if (adjacencyMatrix.has(rightNeighbor)) {
      adjacencyMatrix.get(rightNeighbor)!.add(leftNeighbor);
    } else {
      adjacencyMatrix.set(rightNeighbor, new Set([leftNeighbor]));
    }
  }
  console.log(adjacencyMatrix);

  const graph = new Graph(adjacencyMatrix);
  const rule = new Rule(oldRoot, rightNode, graph);
  return rule;
}

const testString = "[(d_1, b_1), (b_1, c_1), (c_1, b_2), ()]";
const oldRoot = "a";
const newRoot = "b";
console.log(createRuleFromString(oldRoot, newRoot, testString));

export {};
