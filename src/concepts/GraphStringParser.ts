import { Rule } from "./Rule";
import { GraphNode } from "./GraphNode";
import { Graph } from "./Graph";

function createRuleFromString(
  nodeMap: Map<string, GraphNode>,
  oldRoot: string,
  newRoot: string,
  probability: number,
  graphString: string
) {
  let leftNode = nodeMap.get(oldRoot)?.deepcopy();
  let rightNode = nodeMap.get(newRoot)?.deepcopy();

  graphString = graphString.trim().slice(1, -1);
  const allNodeStrings = graphString
    .split(/\(|\)|\s|,/)
    .filter((value: string) => value !== "");

  // Create instances for all unique nodes
  const nodeInstances: Map<String, GraphNode> = new Map<String, GraphNode>();
  for (let nodeString of allNodeStrings) {
    if (nodeInstances.has(nodeString)) {
      continue;
    }

    const parsedNode = nodeString.split("_");
    const nodeInstance = nodeMap.get(parsedNode[0])?.deepcopy();

    if (nodeInstance === undefined) {
      throw new TypeError("Node in graph not included in nodeMap");
    }
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

  // return [oldRoot, newRoot, probability];
}

const testString = "[(d_1, b_1), (b_1, c_1)]";
const oldRoot = "a";
const newRoot = "b";
const probability = 0.36;
let testNodeMap: Map<string, GraphNode> = new Map<string, GraphNode>([
  ["a", new GraphNode("a")],
  ["b", new GraphNode("b")],
  ["c", new GraphNode("c")],
  ["d", new GraphNode("d")],
]);
console.log(
  createRuleFromString(testNodeMap, oldRoot, newRoot, probability, testString)
);

export {};
